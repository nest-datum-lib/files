const fs = require('fs');

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
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';

@Injectable()
export class FileService extends SqlService {
	public entityName = 'file';
	public entityConstructor = File;

	constructor(
		@InjectRepository(File) public repository: Repository<File>,
		@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
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
		systemId: true,
		path: true,
		name: true,
		description: true,
		type: true,
		size: true,
		isNotDelete: true,
		isDeleted: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
	};

	async dropIsDeletedRows(repository, id: string): Promise<any> {
		const file = await super.dropIsDeletedRows(repository, id);
		
		if (file['isDeleted']) {
			await (new Promise((resolve, reject) => {
				fs.unlink(`${process.env.APP_ROOT_PATH}/${file['path']}`, async (err) => {
					if (err) {
						return reject(new Error(err.message));
					}
					else {
						return resolve(true);
					}
				});
			}));
		}
		return file;
	}

	async create(payload: object = {}): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			delete payload['accessToken'];
			delete payload['refreshToken'];

			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);

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
			const parentFolder = await this.folderRepository.findOne({
				select: {
					id: true,
					path: true,
				},
				where: {
					...(payload['parentId']
						&& typeof payload['parentId'] === 'string')
						? { parentId: payload['parentId'] }
						: ((typeof payload['path'] === 'string')
							? { path: (payload['path'] || '/') }
							: {})
				},
			});
			let i = 0,
				output = [];

			if (parentFolder) {
				while (i < payload['files'].length) {
					const mimetypeSplit = payload['files'][i].mimetype.split('/');
					const fileName = payload['files'][i]['originalname'];
					const fileNameSplit = fileName.split('.');
					const extension = ((mimetypeSplit[mimetypeSplit.length - 1] === 'octet-stream')
						? fileNameSplit[fileNameSplit.length - 1]
						: mimetypeSplit[mimetypeSplit.length - 1]) || 'octet-stream';
					const buffer = Buffer.from(payload['files'][i]['buffer']);
					const path = (parentFolder['path'] === '/')
						? `/${fileName}`
						: `${parentFolder['path']}/${fileName}`;
					let file = await this.repository.findOne({
						where: {
							path,
						},
					});

					if (file) {
						await queryRunner.manager.update(File, file['id'], {
							name: fileName,
							type: extension,
							size: payload['files'][i].size,
						});

						file['name'] = fileName;
						file['type'] = extension;
						file['size'] = payload['files'][i].size;
					}
					else {
						file = await queryRunner.manager.save(Object.assign(new File, {
							systemId: payload['systemId'],
							userId: payload['userId'] || process.env.USER_ID,
							parentId: parentFolder['id'],
							path: (parentFolder['path'] === '/')
								? `/${fileName}`
								: `${parentFolder['path']}/${fileName}`,
							name: fileName,
							type: extension,
							size: payload['files'][i].size,
						}));
					}
					output.push(file);
					fs.createWriteStream(`${process.env.APP_ROOT_PATH}/${parentFolder['path']}/${fileName}`).write(buffer);
					i++;
				}
			}
			else {
				throw new Error('Folder is not exists.');
			}
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

			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);

			const file = await this.repository.findOne({ 
				select: {
					id: true,
					name: true,
					path: true,
				},
				where: { 
					id: payload['id'],
				},
				relations: [ 'parent' ],
			});

			await queryRunner.manager.update(File, payload['id'], {
				...payload,
				...newId
					? { id: newId }
					: {},
			});

			if (typeof payload['path'] === 'string'
				&& payload['path'] !== file['path']) {
				const newPath = payload['path'] || '/';

				await queryRunner.manager.update(File, payload['id'], {
					path: `${payload['path']}/${file['name']}`,
				});
				await (new Promise((resolve, reject) => {
					fs.exists(`${process.env.APP_ROOT_PATH}/${newPath}`, async (existsFlag) => {
						if (existsFlag) {
							let fileName = payload['name'] || file['name'];

							fs.exists(`${process.env.APP_ROOT_PATH}/${newPath}/${fileName}`, async (existsFlag) => {
								if (existsFlag) {
									fileName = `(copy ${uuidv4()}) - ${fileName}`;
								}
								fs.copyFile(`${process.env.APP_ROOT_PATH}/${newPath}/${file['name']}`, `${process.env.APP_ROOT_PATH}/${newPath}/${fileName}`, async (err) => {
									if (err) {
										return reject(new Error(err.message));
									}
									else {
										fs.unlink(`${process.env.APP_ROOT_PATH}/${newPath}/${file['name']}`, async (err) => {
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

							return resolve(true);
						}
						else {
							return reject(new Error('Folder is not exists.'));
						}
					});
				}));
			}
			if (payload['name']
				&& (payload['path'] === file['path']
					|| typeof payload['path'] !== 'string')) {
				await (new Promise(async (resolve, reject) => {
					const destinationPath = `${process.env.APP_ROOT_PATH}${file['parent']['path']}/${file['name']}`;
					const newPath = `${process.env.APP_ROOT_PATH}${file['parent']['path']}/${payload['name']}`;

					await queryRunner.manager.update(File, payload['id'], {
						path: `${file['parent']['path']}/${payload['name']}`,
					});

					fs.rename(destinationPath, newPath, async (err) => {
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
