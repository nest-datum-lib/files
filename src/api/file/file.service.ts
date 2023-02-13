const fs = require('fs-extra');

import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	objQueryRunner as utilsCheckObjQueryRunner, 
} from '@nest-datum-utils/check';
import { StorageService } from '../storage/storage.service';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';

@Injectable()
export class FileService extends StorageService {
	protected entityName = 'file';
	protected entityConstructor = File;

	constructor(
		@InjectRepository(File) protected entityRepository: Repository<File>,
		@InjectRepository(Folder) protected folderRepository: Repository<Folder>,
		@InjectRepository(SystemSystemSystemOption) protected systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) protected providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
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
		});
	}

	protected oneGetColumns(customColumns: object = {}) {
		return ({
			...this.manyGetColumns(customColumns),
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
		});
	}

	public async create(payload: object = {}): Promise<any> {
		await this.createQueryRunnerManager();

		try {
			await this.startQueryRunnerManager();
			await this.createBefore(payload);
		
			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);

			const processedPayload = await this.createProperties(payload);
			let i = 0,
				output = [];

			while (i < processedPayload['files'].length) {
				const processedPayloadFileItem = await this.createPropertiesFileItem(processedPayload, processedPayload['files'][i]);

				output.push(await this.createProcess(processedPayloadFileItem));
				fs.createWriteStream(`${process.env.PATH_ROOT}/${processedPayloadFileItem['parentFolder']['path']}/${processedPayloadFileItem['fileName']}`).write(processedPayloadFileItem['buffer']);
				i++;
			}
			return await this.createOutput(processedPayload, await this.createAfter(payload, processedPayload, output));
		}
		catch (err) {
			await this.rollbackQueryRunnerManager();

			throw err;
		}
		finally {
			await this.dropQueryRunnerManager();
		}

	}

	protected async createPropertiesFileItem(processedPayload, fileObj): Promise<any> {
		const parentFolder = processedPayload['parentFolder'];
		const parentFolderPath = parentFolder['path'];
		const mimetypeSplit = fileObj.mimetype.split('/');
		const fileName = fileObj['originalname'];
		const fileNameSplit = fileName.split('.');
		const extension = ((mimetypeSplit[mimetypeSplit.length - 1] === 'octet-stream')
			? fileNameSplit[fileNameSplit.length - 1]
			: mimetypeSplit[mimetypeSplit.length - 1]) || 'octet-stream';
		const buffer = Buffer.from(fileObj['buffer']);
		const path = (parentFolderPath === '/')
			? `/${fileName}`
			: `${parentFolderPath}/${fileName}`;

		return {
			systemId: processedPayload['systemId'],
			file: fileObj,
			path,
			fileName,
			extension,
			buffer,
			parentFolder,
		};
	}

	protected async createProperties(payload: object): Promise<any> {
		const processedPayload = await super.createProperties(payload);

		if (!payload['path']) {
			payload['path'] = await this.getPathBySystemId(payload['systemId']);
		}
		const parentFolder = await this.getByPath({
			parentId: payload['parentId'],
			path: payload['path'],
		});

		return {
			...payload,
			parentFolder,
		};
	}

	protected async createProcess(payload: object): Promise<any> {
		let file = await this.entityRepository.findOne({
			where: {
				path: payload['path'],
			},
		});

		if (file) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.update(File, file['id'], {
					name: payload['fileName'],
					type: payload['extension'],
					size: payload['file'].size,
				})
				: await this.entityRepository.update({ id: file['id'] }, {
					name: payload['fileName'],
					type: payload['extension'],
					size: payload['file'].size,
				});

			file['name'] = payload['fileName'];
			file['type'] = payload['extension'];
			file['size'] = payload['file'].size;
		}
		else {
			file = (utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.save(Object.assign(new File, {
					systemId: payload['systemId'],
					userId: payload['userId'] || process.env.USER_ID,
					parentId: payload['parentFolder']['id'],
					path: (payload['parentFolder']['path'] === '/')
						? `/${payload['fileName']}`
						: `${payload['parentFolder']['path']}/${payload['fileName']}`,
					name: payload['fileName'],
					type: payload['extension'],
					size: payload['file'].size,
				}))
				: await this.entityRepository.save({
					systemId: payload['systemId'],
					userId: payload['userId'] || process.env.USER_ID,
					parentId: payload['parentFolder']['id'],
					path: (payload['parentFolder']['path'] === '/')
						? `/${payload['fileName']}`
						: `${payload['parentFolder']['path']}/${payload['fileName']}`,
					name: payload['fileName'],
					type: payload['extension'],
					size: payload['file'].size,
				});
		}
		return file;
	}

	protected async updateBefore(payload): Promise<any> {
		this.cacheService.clear([ 'folder', 'one' ]);
		this.cacheService.clear([ 'folder', 'many' ]);
		
		return await this.before(payload);
	}

	protected async updateAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		const file = await this.entityRepository.findOne({ 
			select: {
				id: true,
				name: true,
				path: true,
			},
			where: { 
				id: initialPayload['id'],
			},
			relations: [ 'parent' ],
		});

		if (utilsCheckStr(initialPayload['path'])
			&& initialPayload['path'] !== file['path']) {
			await this.renameByPath(file, initialPayload);
		}
		if (initialPayload['name']
			&& (initialPayload['path'] === file['path']
				|| !utilsCheckStr(initialPayload['path']))) {
			await this.renameByName(file, initialPayload);
		}
		return await this.after(initialPayload, processedPayload, data);
	}

	protected async renameByPath(file, payload: object) {
		const newPath = payload['path'] || '/';

		(utilsCheckObjQueryRunner(this.queryRunner) 
			&& this.enableTransactions === true)
			? await this.queryRunner.manager.update(File, payload['id'], {
				path: `${payload['path']}/${file['name']}`,
			})
			: await this.entityRepository.update({ id: payload['id'] }, {
				path: `${payload['path']}/${file['name']}`,
			});
		await (new Promise((resolve, reject) => {
			fs.exists(`${process.env.PATH_ROOT}/${newPath}`, async (existsFlag) => {
				if (!existsFlag) {
					return reject(new Error('Folder is not exists.'));
				}
				let fileName = payload['name'] || file['name'];

				fs.exists(`${process.env.PATH_ROOT}/${newPath}/${fileName}`, async (existsFlag) => {
					if (existsFlag) {
						fileName = `(copy ${uuidv4()}) - ${fileName}`;
					}
					fs.copyFile(`${process.env.PATH_ROOT}/${newPath}/${file['name']}`, `${process.env.PATH_ROOT}/${newPath}/${fileName}`, async (err) => {
						if (err) {
							return reject(new Error(err.message));
						}
						fs.unlink(`${process.env.PATH_ROOT}/${newPath}/${file['name']}`, async (err) => {
							if (err) {
								return reject(new Error(err.message));
							}
							return resolve(true);
						});
					});
				});
					return resolve(true);
			});
		}));
	}

	protected async renameByName(file, payload: object): Promise<any> {
		await (new Promise(async (resolve, reject) => {
			const parentFolder = file['parent'];
			const sourcePath = `${process.env.PATH_ROOT}${parentFolder['path']}/${file['name']}`;
			const newPath = `${process.env.PATH_ROOT}${parentFolder['path']}/${payload['name']}`;

			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.update(File, payload['id'], {
					path: `${parentFolder['path']}/${payload['name']}`,
				})
				: await this.entityRepository.update({ id: payload['id'] }, {
					path: `${parentFolder['path']}/${payload['name']}`,
				});
			fs.rename(sourcePath, newPath, async (err) => {
				if (err) {							
					return reject(new Error(err.message));
				}
				return resolve(true);
			});
		}));
	}

	protected async dropResourceByPath(path: string): Promise<any> {
		return await (new Promise((resolve, reject) => {
			fs.unlink(`${process.env.PATH_ROOT}/${path}`, async (err) => {
				if (err) {
					return reject(new Error(err.message));
				}
				return resolve(true);
			});
		}));
	}

	protected async dropProcess(entityOrId): Promise<any> {
		const file = await super.dropProcess(entityOrId);

		if (file.isDeleted) {
			await this.dropResourceByPath(file['path']);
		}
		return file;
	}
}
