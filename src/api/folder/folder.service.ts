const fs = require('fs-extra');
const { chmod } = require('node:fs/promises');

import Redis from 'ioredis';
import getCurrentLine from 'get-current-line';
import { v4 as uuidv4 } from 'uuid';
import { 
	Inject,
	Injectable, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { SqlService } from 'nest-datum/sql/src';
import { CacheService } from 'nest-datum/cache/src';
import { 
	ErrorException,
	NotFoundException, 
} from 'nest-datum/exceptions/src';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { File } from '../file/file.entity';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService extends SqlService {
	constructor(
		@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) private readonly providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
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

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'folder', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.folderRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'folder', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'folder', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.folderRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'folder', 'one', payload ], output);
			}
			if (!output) {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async drop({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'folder', 'one', payload ]);

			const folder = await this.dropByIsDeleted(this.folderRepository, payload['id'], async (folder) => {
				const filderChildItems = await this.folderRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${folder['path']}/%`),
					}
				});
				let i = 0;

				while (i < filderChildItems.length) {
					await this.folderRepository.delete({ id: filderChildItems[i].id });
					i++;
				}
			});
			
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
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'folder', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				const folder = await this.dropByIsDeleted(this.folderRepository, payload['ids'][i], async (folder) => {
					const filderChildItems = await this.folderRepository.find({
						select: {
							id: true,
							path: true,
						},
						where: {
							path: Like(`${folder['path']}/%`),
						}
					});
					let i = 0;

					while (i < filderChildItems.length) {
						await this.folderRepository.delete({ id: filderChildItems[i].id });
						i++;
					}
				});
				await (new Promise((resolve, reject) => {
					fs.remove(`${process.env.APP_ROOT_PATH}/${folder['path']}`, async (err) => {
						if (err) {
							return reject(new Error(err.message));
						}
						else {
							return resolve(true);
						}
					});
				}));
				i++;
			}
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'folder', 'many' ]);

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
					return new NotFoundException('File system is undefined', getCurrentLine(), { user, ...payload });
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
					return new NotFoundException('Provider is undefined', getCurrentLine(), { user, ...payload });
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
						? { id: payload['parentId'] }
						: ((payload['path']
							&& typeof payload['path'] === 'string')
							? { path: (payload['path'] || '/') }
							: {}),
				},
			});
			let output;
			
			if (parentFolder) {
				output = await this.folderRepository.save({
					...payload,
					userId: user['id'] || '',
					parentId: parentFolder['id'],
					path: (payload['path'] === '/')
						? `/${payload['name']}`
						: `${payload['path']}/${payload['name']}`,
				});
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
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'folder', 'one' ]);

			const currentFolder = await this.folderRepository.findOne({ 
				select: {
					id: true,
					name: true,
					path: true,
				},
				where: { 
					id: payload['id'],
				},
			});

			await this.updateWithId(this.folderRepository, payload);

			if (typeof payload['path'] === 'string'
				&& payload['path'] !== currentFolder['path']) {
				const newPath = (payload['path'] || '/');
				const folderChildItems = await this.folderRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				const fileChildItems = await this.fileRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				let i = 0;

				await this.updateWithId(this.folderRepository, {
					id: payload['id'],
					path: payload['path'],
				});

				while (i < folderChildItems.length) {
					await this.folderRepository.update({ id: folderChildItems[i]['id'] }, {
						path: folderChildItems[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`),
					});
					i++;
				}
				i = 0;

				while (i < fileChildItems.length) {
					await this.fileRepository.update({ id: fileChildItems[i]['id'] }, {
						path: fileChildItems[i]['path'].replace(`${currentFolder['path']}/`, `${payload['path']}/`),
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
				const folderChildItems = await this.folderRepository.find({
					select: {
						id: true,
						path: true,
					},
					where: {
						path: Like(`${currentFolder['path']}/%`),
					},
				});
				const fileChildItems = await this.fileRepository.find({
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

				await this.updateWithId(this.folderRepository, {
					id: payload['id'],
					path: newPath,
				});

				while (i < folderChildItems.length) {
					await this.folderRepository.update({ id: folderChildItems[i]['id'] }, {
						path: folderChildItems[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`),
					});
					i++;
				}
				i = 0;

				while (i < fileChildItems.length) {
					await this.fileRepository.update({ id: fileChildItems[i]['id'] }, {
						path: fileChildItems[i]['path'].replace(`${currentFolder['path']}/`, `${newPath}/`),
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
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}
}
