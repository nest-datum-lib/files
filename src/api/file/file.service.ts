const fs = require('fs');

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
} from 'typeorm';
import { SqlService } from 'nest-datum/sql/src';
import { CacheService } from 'nest-datum/cache/src';
import { 
	ErrorException,
	NotFoundException, 
} from 'nest-datum/exceptions/src';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';

@Injectable()
export class FileService extends SqlService {
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
		path: true,
		name: true,
		description: true,
		type: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'file', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fileRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'file', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'file', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fileRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'file', 'one', payload ], output);
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
			
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one', payload ]);

			const file = await this.dropByIsDeleted(this.fileRepository, payload['id']);

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
			
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				const file = await this.dropByIsDeleted(this.fileRepository, payload['ids'][i]);
			
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
					let file = await this.fileRepository.findOne({
						where: {
							path,
						},
					});

					if (file) {
						await this.fileRepository.update({
							id: file['id'],
						}, {
							name: fileName,
							type: extension,
							size: payload['files'][i].size,
						});

						file['name'] = fileName;
						file['type'] = extension;
						file['size'] = payload['files'][i].size;
					}
					else {
						file = await this.fileRepository.save({
							systemId: payload['systemId'],
							userId: user['id'] || '',
							parentId: parentFolder['id'],
							path: (parentFolder['path'] === '/')
								? `/${fileName}`
								: `${parentFolder['path']}/${fileName}`,
							name: fileName,
							type: extension,
							size: payload['files'][i].size,
						});
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
			
			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);
			
			const file = await this.fileRepository.findOne({ 
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

			await this.updateWithId(this.fileRepository, payload);

			if (typeof payload['path'] === 'string'
				&& payload['path'] !== file['path']) {
				const newPath = payload['path'] || '/';

				await this.updateWithId(this.fileRepository, {
					id: payload['id'],
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

					await this.updateWithId(this.fileRepository, {
						id: payload['id'],
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
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}
}
