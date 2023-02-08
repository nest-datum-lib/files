const fs = require('fs-extra');
const { chmod } = require('node:fs/promises');

import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { 
	ErrorException,
	WarningException, 
	NotFoundException,
} from '@nest-datum-common/exceptions';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import {
	encryptPassword,
	generateVerifyKey,
	generateTokens,
	checkPassword,
} from '@nest-datum/jwt';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { File } from '../file/file.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService extends SqlService {
	public entityName = 'folder';
	public entityConstructor = Folder;

	constructor(
		@InjectRepository(Folder) public repository: Repository<Folder>,
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) private readonly providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		parentId: true,
		path: true,
		name: true,
		description: true,
		systemId: true,
		isNotDelete: true,
		isDeleted: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		path: true,
		name: true,
		description: true,
	};

	async dropIsDeletedRows(repository, id: string): Promise<any> {
		const folder = await super.dropIsDeletedRows(repository, id);
		const folderChildren = await this.repository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});
		
		await repository.delete(Folder, folderChildren.map(({ id }) => id));
	
		if (folder['isDeleted']) {
			await (new Promise((resolve, reject) => {
				fs.rmdir(`${process.env.APP_ROOT_PATH}${folder['path']}`, { recursive: true }, async (err) => {
					if (err) {
						return reject(new Error(err.message));
					}
					else {
						return resolve(true);
					}
				});
			}));
		}
		return folder;
	}

	async create(payload: object = {}): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			delete payload['accessToken'];
			delete payload['refreshToken'];
			
			this.cacheService.clear([ this.entityName, 'many' ]);

			if (!payload['path']) {
				const systemOptionContent = await this.systemSystemSystemOptionRepository.findOne({
					select: {
						id: true,
						systemId: true,
						content: true,
					},
					where:{
						systemId: payload['systemId'],
						systemSystemOption: {
							systemOption: {
								id: 'files-system-option-root',
							},
						},
					},
					relations: {
						system: true,
					},
				});

				if (!systemOptionContent
					|| !systemOptionContent['system']) {
					return new NotFoundException('File system is undefined');
				}
				const provider = await this.providerProviderProviderOptionRepository.findOne({
					select: {
						id: true,
						providerId: true,
						content: true,
					},
					where:{
						providerId: systemOptionContent['system']['providerId'],
						providerProviderOption: {
							providerOption: {
								id: 'files-provider-option-root-path',
							},
						},
					},
				});

				if (!provider) {
					return new NotFoundException('Provider is undefined');
				}
				payload['path'] = ((provider['content'] === '/')
					? ''
					: provider['content']) + systemOptionContent['content'];
			}
			const parentFolder = await this.repository.findOne({
				select: {
					id: true,
					path: true,
				},
				where: {
					...(payload['parentId']
						&& typeof payload['parentId'] === 'string')
						? { id: payload['parentId'] }
						: ((payload['path']
							&& typeof payload['path'] === 'string')
							? { path: (payload['path'] || '/') }
							: {}),
				},
			});
			let output;

			console.log('??', {
					...(payload['parentId']
						&& typeof payload['parentId'] === 'string')
						? { id: payload['parentId'] }
						: ((payload['path']
							&& typeof payload['path'] === 'string')
							? { path: (payload['path'] || '/') }
							: {}),
				});

			if (parentFolder) {
				output = await queryRunner.manager.save(Object.assign(new Folder, {
					...payload,
					parentId: parentFolder['id'],
					path: (payload['path'] === '/')
						? `/${payload['name']}`
						: `${payload['path']}/${payload['name']}`,
				}));
			}
			else {
				throw new Error(`Parent folder is not exists.`);
			}
			const destinationPath = '/'+ (`${process.env.APP_ROOT_PATH}/${parentFolder['path']}/${payload['name']}`);

			await (new Promise(async (resolve, reject) => {
				fs.exists(destinationPath, async (existsFlag) => {
					if (!existsFlag) {
						fs.mkdir(destinationPath, { recursive: true }, async (err) => {
							if (err) {
								return reject(new Error(err.message));
							}
							try {
								await chmod(destinationPath, 0o777);
							}
							catch (err) {
								return reject(new Error(err.message));
							}

							return resolve(true);
						});
					}
					else {
						return reject(new Error('Folder already exists.'));
					}
				});
			}));
			await queryRunner.commitTransaction();

			return output;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			throw err;
		}
		finally {
			await queryRunner.release();
		}
	}

	async update(payload: object = {}): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			const newId = utilsCheckStrId(payload['newId']) && payload['newId'];

			delete payload['accessToken'];
			delete payload['refreshToken'];
			delete payload['newId'];

			this.cacheService.clear([ this.entityName, 'many' ]);
			this.cacheService.clear([ this.entityName, 'one' ]);

			const currentFolder = await this.repository.findOne({ 
				select: {
					id: true,
					name: true,
					path: true,
				},
				where: { 
					id: payload['id'],
				},
			});
			const clearPayload = { ...payload };

			delete clearPayload['path'];

			console.log('11111111', { ...clearPayload });

			await queryRunner.manager.update(Folder, payload['id'], {
				...clearPayload,
				...newId
					? { id: newId }
					: {},
			});

			if (typeof payload['path'] === 'string'
				&& payload['path'] !== currentFolder['path']) {
				const newPath = (payload['path'] || '/');
				const folderChildren = await this.repository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				const fileChildren = await this.fileRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				let i = 0;

				while (i < folderChildren.length) {
					console.log('22222', folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`));

					await queryRunner.manager.update(Folder, folderChildren[i]['id'], {
						path: folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`),
					});
					i++;
				}
				i = 0;

				while (i < fileChildren.length) {
					console.log('333333', fileChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`));

					await queryRunner.manager.update(File, fileChildren[i]['id'], {
						path: fileChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`),
					});
					i++;
				}
				await (new Promise((resolve, reject) => {
					fs.exists(`${process.env.APP_ROOT_PATH}/${newPath}`, async (existsFlag) => {
						if (existsFlag) {
							let folderName = payload['name'] || currentFolder['name'];

							fs.exists(`${process.env.APP_ROOT_PATH}/${newPath}/${folderName}`, async (existsFlag) => {
								if (existsFlag) {
									folderName = `(copy ${uuidv4()}) - ${folderName}`;
								}
								fs.cp(`${process.env.APP_ROOT_PATH}/${newPath}/${currentFolder['name']}`, `${process.env.APP_ROOT_PATH}/${newPath}/${folderName}`, { recursive: true }, async (err) => {
									if (err) {
										return reject(new Error(err.message));
									}
									else {
										fs.rmdir(`${process.env.APP_ROOT_PATH}/${newPath}/${currentFolder['name']}`, { recursive: true }, async (err) => {
											if (err) {
												return reject(new Error(err.message));
											}
											else {
												return resolve(true);
											}
										});
									}
								});
							});
						}
						else {
							return reject(new Error('Parent directory not found.'));
						}
					});
				}));
			}
			if (payload['name']
				&& (payload['path'] === currentFolder['path']
					|| typeof payload['path'] !== 'string')) {
				const folderPathSplit = currentFolder['path'].split('/');
				const folderChildren = await this.repository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				const fileChildren = await this.fileRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				let i = 0;

				folderPathSplit[folderPathSplit.length - 1] = payload['name'];
				
				const newPath = folderPathSplit.join('/');

				console.log('444444444444444', folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`));

				await queryRunner.manager.update(Folder, payload['id'], {
					path: folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`),
				});
				while (i < folderChildren.length) {
					console.log('555555', folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`));

					await queryRunner.manager.update(Folder, folderChildren[i]['id'], {
						path: folderChildren[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`),
					});
					i++;
				}
				i = 0;

				while (i < fileChildren.length) {
					console.log('66666666', fileChildren[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`));

					await queryRunner.manager.update(File, { id: fileChildren[i]['id'] }, {
						path: fileChildren[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`),
					});
					i++;
				}

				await (new Promise((resolve, reject) => {
					const sourcePath = `${process.env.APP_ROOT_PATH}${currentFolder['path']}`;
					const destinationPath = `${process.env.APP_ROOT_PATH}${newPath}`;

					fs.rename(sourcePath, destinationPath, async (err) => {
						if (err) {
							return reject(new Error(err.message));
						}
						else {
							return resolve(true);
						}
					});
				}));
			}
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			throw err;
		}
		finally {
			await queryRunner.release();
		}
	}
}
