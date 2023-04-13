import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import {
	strIdExists as utilsCheckStrIdExists,
	objFilled as utilsCheckObjFilled,
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
			filter = `WHERE systemId = '${payload['systemId']}' `;

		delete payload['systemId'];

		if (page >= 1) {
			page = 0;
		}
		page = page * limit;

		if (utilsCheckObjFilled(payload['filter'])) {
			filter += `AND (`;

			if (utilsCheckStrIdExists(payload['filter']['parentId'])) {
				filter += `parentId = '${payload['filter']['parentId']}'`;
			}
			if (utilsCheckStrIdExists(payload['filter']['isDeleted'])) {
				filter += `isDeleted = ${!!Number(payload['filter']['isDeleted'])}`;
			}
			if (utilsCheckStrIdExists(payload['filter']['isNotDelete'])) {
				filter += `isNotDelete = ${!!Number(payload['filter']['isNotDelete'])}`;
			}
			filter += `)`;
		}
		return [
			await this.connection.query(`SELECT * FROM (SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM folder AS b ${filter} ORDER BY id DESC) AS t1 UNION SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM file AS b ${filter} ORDER BY id DESC) AS t2) AS qry LIMIT ${page},${page + limit};`),
			Number((((await this.connection.query(`SELECT COUNT(*) as total FROM (SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM folder AS b ${filter} ORDER BY id DESC) AS t1 UNION SELECT * FROM (SELECT id, userId, systemId, parentId, path, name, description, type, size, isNotDelete, isDeleted, createdAt FROM file AS b ${filter} ORDER BY id DESC) AS t2) AS qry LIMIT ${page},${page + limit};`)) ?? [])[0] || {})['total']),
		];
	}
}
