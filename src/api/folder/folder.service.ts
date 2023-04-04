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
import { CacheService } from '@nest-datum/cache';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	objQueryRunner as utilsCheckObjQueryRunner, 
} from '@nest-datum-utils/check';
import { StorageService } from '../storage/storage.service';
import { File } from '../file/file.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService extends StorageService {
	protected entityName = 'folder';
	protected entityConstructor = Folder;

	constructor(
		@InjectRepository(Folder) protected entityRepository: Repository<Folder>,
		@InjectRepository(File) protected fileRepository: Repository<File>,
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
			path: true,
			name: true,
			description: true,
			systemId: true,
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
			path: true,
			name: true,
			description: true,
		});
	}

	protected async createProperties(payload: object): Promise<any> {
		const processedPayload = await super.createProperties({
			...payload,
			path: !payload['path']
				? await this.getPathBySystemId(payload['systemId'])
				: payload['path'],
		});
		const parentFolder = await this.getByPath({
			parentId: processedPayload['parentId'],
			path: processedPayload['path'],
		});

		return {
			...processedPayload,
			parentId: parentFolder['id'],
			path: (processedPayload['path'] === '/')
				? `/${processedPayload['name']}`
				: `${processedPayload['path']}/${processedPayload['name']}`,
		};
	}

	protected async createAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		const destinationPath = `${process.env.PATH_ROOT}${data['path']}`;

		await (new Promise(async (resolve, reject) => {
			fs.exists(destinationPath, async (existsFlag) => {
				if (existsFlag) {
					return reject(new Error('Folder already exists.'));
				}
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
			});
		}));
		return await super.after(initialPayload, processedPayload, data);
	}

	protected async updateAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		const currentFolder = await this.entityRepository.findOne({ 
			select: {
				id: true,
				name: true,
				path: true,
			},
			where: { 
				id: initialPayload['id'],
			},
		});

		if (utilsCheckStr(initialPayload['path'])
			&& initialPayload['path'] !== currentFolder['path']) {
			await this.renameByPath(currentFolder, initialPayload);
		}
		if (initialPayload['name']
			&& (initialPayload['path'] === currentFolder['path']
				|| typeof initialPayload['path'] !== 'string')) {
			await this.renameByNameDb(currentFolder, initialPayload);

			if (utilsCheckStr(initialPayload['path'])) {
				await this.renameByNameStorage(currentFolder, initialPayload);
			}
		}
		return await this.after(initialPayload, processedPayload, data);
	}

	protected async renameByNameStorage(folder, payload: object): Promise<any> {
		await (new Promise((resolve, reject) => {
			const sourcePath = `${process.env.PATH_ROOT}${folder['path']}`;

			fs.rename(sourcePath, this.editPathStr(sourcePath, folder['path'], payload['name'], true), async (err) => {
				if (err) {
					return reject(new Error(err.message));
				}
				return resolve(true);
			});
		}));
	}

	protected editPathStr(currentPath: string, folderPath: string, newPath: string, defineNewPath = false): string {
		if (defineNewPath) {
			const folderPathSplit = folderPath.split('/');

			folderPathSplit[folderPathSplit.length - 1] = newPath;
			newPath = folderPathSplit.join('/');
		}
		const currentPathSplit = currentPath.split('/');
		const newPathSplit = newPath.split('/');

		currentPathSplit[currentPathSplit.length - 1] = newPathSplit[newPathSplit.length - 1];

		return currentPathSplit.join('/');
	}

	protected async renameByNameDb(folder, payload: object): Promise<any> {
		const folderPathSplit = folder['path'].split('/');
		const folderChildItems = await this.entityRepository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});
		const fileChildItems = await this.fileRepository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});
		let i = 0;

		folderPathSplit[folderPathSplit.length - 1] = payload['name'];
				
		const newPath = folderPathSplit.join('/');

		await super.updateProcess(payload['id'], { path: newPath });
		while (i < folderChildItems.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.update(this.entityConstructor, folderChildItems[i]['id'], {
					path: this.editPathStr(folderChildItems[i]['path'], folder['path'], newPath),
				})
				: await this.entityRepository.update({ id: folderChildItems[i]['id'] }, {
					path: this.editPathStr(folderChildItems[i]['path'], folder['path'], newPath),
				});
			i++;
		}
		i = 0;

		while (i < fileChildItems.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.update(File, fileChildItems[i]['id'], {
					path: fileChildItems[i]['path'].replace(`${folder['path']}/`, `${newPath}/`),
				})
				: await this.fileRepository.update({ id: fileChildItems[i]['id'] }, {
					path: fileChildItems[i]['path'].replace(`${folder['path']}/`, `${newPath}/`),
				});
			i++;
		}
	}

	protected async renameByPath(folder, payload: object): Promise<any> {
		await this.renameByPathDb(folder, payload);
		await this.renameByPathStorage(folder, payload);
	}

	protected async renameByPathStorage(folder, payload): Promise<any> {
		await (new Promise((resolve, reject) => {
			fs.exists(`${process.env.PATH_ROOT}/${payload['path']}`, async (existsFlag) => {
				if (!existsFlag) {
					return reject(new Error('Parent directory not found.'));
				}
				let folderName = payload['name'] || folder['name'];

				fs.exists(`${process.env.PATH_ROOT}/${payload['path']}/${folderName}`, async (existsFlag) => {
					if (existsFlag) {
						folderName = `(copy ${uuidv4()}) - ${folderName}`;
					}
					fs.cp(`${process.env.PATH_ROOT}/${payload['path']}/${folder['name']}`, `${process.env.PATH_ROOT}/${payload['path']}/${folderName}`, { recursive: true }, async (err) => {
						if (err) {
							return reject(new Error(err.message));
						}
						fs.rm(`${process.env.PATH_ROOT}/${payload['path']}/${folder['name']}`, { recursive: true }, async (err) => {
							if (err) {
								return reject(new Error(err.message));
							}
							return resolve(true);
						});
					});
				});
			});
		}));
	}

	protected async renameByPathDb(folder, payload: object): Promise<any> {
		const folderChildren = await this.entityRepository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});
		const fileChildren = await this.fileRepository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});
		let i = 0;

		while (i < folderChildren.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				?  await this.queryRunner.manager.update(Folder, folderChildren[i]['id'], {
					path: folderChildren[i]['path'].replace(`${folder['path']}/`, `${payload['path']}/`),
				})
				: await this.entityRepository.update({ id: folderChildren[i]['id'] }, {
					path: folderChildren[i]['path'].replace(`${folder['path']}/`, `${payload['path']}/`),
				});
			i++;
		}
		i = 0;

		while (i < fileChildren.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.update(File, fileChildren[i]['id'], {
					path: fileChildren[i]['path'].replace(`${folder['path']}/`, `${payload['path']}/`),
				})
				: await this.entityRepository.update({ id: fileChildren[i]['id'] }, {
					path: fileChildren[i]['path'].replace(`${folder['path']}/`, `${payload['path']}/`),
				});
			i++;
		}
		return {
			folderChildren,
			fileChildren,
		};
	}

	protected async dropByPath(path: string): Promise<any> {
		await (new Promise((resolve, reject) => {
			fs.rm(`${process.env.PATH_ROOT}${path}`, { recursive: true }, async (err) => {
				if (err) {
					return reject(new Error(err.message));
				}
				return resolve(true);
			});
		}));
	}

	protected async dropProcess(entityOrId): Promise<any> {
		const folder = await super.dropProcess(entityOrId);
		const folderChildren = await this.entityRepository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		});

		if (folderChildren.length > 0) {
			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.delete(Folder, folderChildren.map(({ id }) => id))
				: await this.entityRepository.delete(folderChildren.map(({ id }) => id));
		}
		if (folder.isDeleted) {
			await this.dropByPath(folder['path']);
		}
		return folder;
	}
}
