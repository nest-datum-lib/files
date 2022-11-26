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
import { 
	MysqlService,
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { ErrorException } from '@nest-datum/exceptions';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';

@Injectable()
export class FileService extends MysqlService {
	constructor(
		@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
		private readonly connection: Connection,
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
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

	async many(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.file.many`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fileRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set(`${process.env.APP_ID}.file.many`, payload, output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		return [ [], 0 ];
	}

	async one(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.file.one`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fileRepository.findOne(await this.findOne(payload));
		
			await this.cacheService.set(`${process.env.APP_ID}.file.one`, payload, output);

			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
	}

	async drop(payload): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.file.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.file.one`, payload);

			const file = await this.dropByIsDeleted(this.fileRepository, payload['id']);

			if (file['isDeleted']) {
				await (new Promise((resolve, reject) => {
					fs.unlink(`${process.env.ROOT_PATH}/${file['path']}`, async (err) => {
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

			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		finally {
			await queryRunner.release();
		}
	}

	async dropMany(payload): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.file.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.file.one`, payload);

			let i = 0;

			while (i < payload['ids'].length) {
				const file = await this.dropByIsDeleted(this.fileRepository, payload['ids'][i]);
			
				await (new Promise((resolve, reject) => {
					fs.unlink(`${process.env.ROOT_PATH}/${file['path']}`, async (err) => {
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

			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		finally {
			await queryRunner.release();
		}
	}

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.folder.one`);
			await this.cacheService.clear(`${process.env.APP_ID}.folder.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.file.many`);

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
					const extension = mimetypeSplit[mimetypeSplit.length - 1];
					const fileName = payload['files'][i]['originalname'];
					const buffer = Buffer.from(payload['files'][i]['buffer']);

					const file = await this.fileRepository.save({
						systemId: payload['systemId'],
						userId: user['id'] || '',
						parentId: parentFolder['id'],
						path: `${(parentFolder['path'] === '/'
							? ''
							: parentFolder['path'])}/${fileName}`,
						name: fileName,
						type: extension,
						size: payload['files'][i].size,
					});

					output.push(file);
					fs.createWriteStream(`${process.env.ROOT_PATH}/${parentFolder['path']}/${fileName}`).write(buffer);
					i++;
				}
				await (new Promise(async (resolve, reject) => {
					fs.exists(`${process.env.ROOT_PATH}/${parentFolder['path']}`, async (existsFlag) => {
						if (existsFlag) {
							fs.mkdir(`${process.env.ROOT_PATH}/${parentFolder['path']}`, { recursive: true }, async (err) => {
								if (err) {
									return reject(new Error(err.message));
								}
								return resolve(output);
							});
						}
						else {
							return reject(new Error('Folder is not exists.'));
						}
					});
				}));
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
			await this.cacheService.clear(`${process.env.APP_ID}.folder.one`);
			await this.cacheService.clear(`${process.env.APP_ID}.folder.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.file.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.file.one`);
			
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
					fs.exists(`${process.env.ROOT_PATH}/${newPath}`, async (existsFlag) => {
						if (existsFlag) {
							let fileName = payload['name'] || file['name'];

							fs.exists(`${process.env.ROOT_PATH}/${newPath}/${fileName}`, async (existsFlag) => {
								if (existsFlag) {
									fileName = `(copy ${uuidv4()}) - ${fileName}`;
								}
								fs.copyFile(`${process.env.ROOT_PATH}/${newPath}/${file['name']}`, `${process.env.ROOT_PATH}/${newPath}/${fileName}`, async (err) => {
									if (err) {
										return reject(new Error(err.message));
									}
									else {
										fs.unlink(`${process.env.ROOT_PATH}/${newPath}/${file['name']}`, async (err) => {
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
					const destinationPath = `${process.env.ROOT_PATH}${file['parent']['path']}/${file['name']}`;
					const newPath = `${process.env.ROOT_PATH}${file['parent']['path']}/${payload['name']}`;

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
