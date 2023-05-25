import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import {
	strIdExists as utilsCheckStrIdExists,
	objFilled as utilsCheckObjFilled,
	bool as utilsCheckBool,
	objQueryRunner as utilsCheckObjQueryRunner,
} from '@nest-datum-utils/check';
import { MainService } from '@nest-datum/main';
import { CacheService } from '@nest-datum/cache';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { FileService } from '../file/file.service';
import { FolderService } from '../folder/folder.service';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from './system.entity';
import { FileService as DiskFileService } from '@nest-datum/disk';

@Injectable()
export class SystemService extends MainService {
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly repositoryConstructor = System;
	protected readonly repositoryConstructorFolder = Folder;
	protected readonly repositoryConstructorFile = File;
	protected readonly repositoryBindOptionConstructor = SystemSystemOption;
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';

	constructor(
		@InjectRepository(System) protected readonly repository: Repository<System>,
		@InjectRepository(SystemSystemOption) protected repositoryBindOption: Repository<SystemSystemOption>,
		@InjectRepository(Folder) protected repositoryFolder: Repository<Folder>,
		@InjectRepository(File) protected repositoryFile: Repository<File>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
		protected readonly repositoryDiskFile: DiskFileService,
		protected readonly fileService: FileService,
		protected readonly folderService: FolderService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			envKey: true,
			systemStatusId: true,
			providerId: true,
			name: true,
			description: true,
		});
	}

	protected oneGetColumns(customColumns: object = {}): object {
		return ({
			...super.oneGetColumns(customColumns),
			userId: true,
			envKey: true,
			systemStatusId: true,
			providerId: true,
			name: true,
			description: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			envKey: true,
			name: true,
			description: true,
		});
	}

	public async manager(payload): Promise<Array<any>> {
		let limit = Number(payload['limit'] || 10),
			page = Number(payload['page'] || 0),
			filter = `WHERE systemId = '${payload['systemId']}' AND parentId != "" `;

		if (payload['query']) {
			filter += `AND name LIKE '%${payload['query']}%' `;
		}
		if (utilsCheckObjFilled(payload['filter'])) {
			if (utilsCheckStrIdExists(payload['filter']['parentId'])) {
				filter += `AND parentId = '${payload['filter']['parentId']}' `;
			}
			if (String(payload['filter']['isDeleted']) === '0' 
				|| String(payload['filter']['isDeleted']) === '1') {
				filter += `AND isDeleted = ${payload['filter']['isDeleted']} `;
			}
			if (String(payload['filter']['isNotDelete']) === '0' 
				|| String(payload['filter']['isNotDelete']) === '1') {
				filter += `AND isNotDelete = ${payload['filter']['isNotDelete']} `;
			}
		}
		delete payload['systemId'];
		delete payload['query'];

		if (page >= 1) {
			page = page - 1;
		}
		page = page * limit;

		return [
			await this.connection.query(`SELECT * FROM (SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM folder AS b ${filter} ORDER BY id DESC) AS t1 UNION SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM file AS b ${filter} ORDER BY id DESC) AS t2) AS qry ORDER BY type ASC, createdAt DESC LIMIT ${page},${page + limit};`),
			Number((((await this.connection.query(`SELECT COUNT(*) as total FROM (SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM folder AS b ${filter} ORDER BY id DESC) AS t1 UNION SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM file AS b ${filter} ORDER BY id DESC) AS t2) AS qry;`)) ?? [])[0] || {})['total']),
		];
	}

	protected async updateProcess(id: string, processedPayload: object, payload: object): Promise<object> {
		if (processedPayload['newId']) {
			processedPayload['id'] = processedPayload['newId'];

			delete processedPayload['newId'];
		}
		if (this.withCache === true) {
			this.repositoryCache.drop({ key: [ this.prefix(), 'many', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(), 'one', { id } ] });
		}
		if (processedPayload['name'] && processedPayload['type'] === 'file') {
			const currentFile = await this.repositoryFile.findOne({
				select: {
					id: true,
					path: true,
					name: true,
				},
				where: {
					id: processedPayload['id'],
				},
			});

			if (currentFile['name'] !== processedPayload['name']) {
				await this.repositoryDiskFile.updateProcess(id, { path: currentFile['path'], ...processedPayload }, payload);
			
				processedPayload['path'] = this.repositoryDiskFile.path(currentFile['path'], processedPayload['name'], true);
			}
		}

		return (utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
			? await this.queryRunner.manager.update((processedPayload['type'] === 'file') ? this.repositoryConstructorFile : this.repositoryConstructorFolder, id, processedPayload)
			: (processedPayload['type'] === 'file') 
				? await this.repositoryFile.update({ id }, processedPayload)
				: await this.repositoryFolder.update({ id }, processedPayload); 
	}

	public async updateProperties(_payload: object): Promise<object> {
		const payload = await this.checkTypeOfEntity(_payload);

		return await super.updateProperties(payload);
	}

	protected async dropManyProperties(payload): Promise<object> {
		return { ...payload, ids: payload['ids'] };
	}

	protected async dropManyProcess(processedPayload: Array<string>, payload: object): Promise<any> {
		await Promise.all(payload['ids'].map(async (item) => {
			let result = await this.checkTypeOfEntity({ 'id':item });
			if(result['type'] === 'file') {
				await this.dropProcess(result['id'], {...payload, 'id': result['id']});
			} else {
				await this.dropProcess(result['id'], {...payload, 'id': result['id']});
			}
		}));
		return true;
	}

	public async dropProcess(processedPayload: object | string, payload: object): Promise<any> {
		const id = utilsCheckObjFilled(processedPayload)
			? String((processedPayload || {})['id'])
			: String(processedPayload);
		const checkType = await this.checkTypeOfEntity({ id });
		
		if(checkType['type'] === 'file') {
			await this.fileService.dropProcess(id, {...payload, id});
		}
		else {
			await this.folderService.dropProcess(id, {...payload, id});
		}
		return true;
	}

	private async checkTypeOfEntity(payload: object): Promise<object> {
		let whatIsType: any = await this.repositoryFile.findOne({
			select: {
				id: true,
				systemId: true,
			},
			where: {
				id: payload['id'],
			},
		});

		if (!whatIsType) {
			whatIsType = await this.repositoryFolder.findOne({
				select: {
					id: true,
					systemId: true,
				},
				where: {
					id: payload['id'],
				},
			});
			payload['type'] = 'folder';
		} 
		else {
			payload['type'] = 'file';
		}

		if (whatIsType) {
			if (whatIsType['systemId'] === 'files-system-avatars') {
				payload['name'] = `${payload['userId']}.jpg`;
			}
			else if (whatIsType['systemId'] === 'files-system-cv') {
				payload['name'] = `${payload['userId']}.pdf`;
			}
		}
		return payload;
	}
}
