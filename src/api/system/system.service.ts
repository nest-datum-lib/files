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
} from '@nest-datum-utils/check';
import { MainService } from '@nest-datum/main';
import { CacheService } from '@nest-datum/cache';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from './system.entity';

@Injectable()
export class SystemService extends MainService {
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly repositoryConstructor = System;
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
}
