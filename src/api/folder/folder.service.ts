import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { 
	objQueryRunner as utilsCheckObjQueryRunner,
	strFileName as utilsCheckStrFileName, 
	strFilled as utilsCheckStrFilled,
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	objFilled as utilsCheckObjFilled,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';
import { 
	FailureException,
	NotFoundException, 
	MethodNotAllowedException,
} from '@nest-datum-common/exceptions';
import { FuseService } from '@nest-datum/fuse';
import { CacheService } from '@nest-datum/cache';
import { FolderService as DiskFolderService } from '@nest-datum/disk';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { File } from '../file/file.entity';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService extends FuseService {
	protected queryRunner;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly withEnvKey: boolean = false;
	protected readonly repositoryConstructor = Folder;
	protected readonly repositoryFileConstructor = File;

	constructor(
		@InjectRepository(Folder) protected readonly repository: Repository<Folder>,
		@InjectRepository(File) protected readonly repositoryFile: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) protected readonly repositorySystemOptionContent: Repository<SystemSystemSystemOption>,
		// @InjectRepository(ProviderProviderProviderOption) protected readonly repositoryProviderOptionContent: Repository<ProviderProviderProviderOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
		protected readonly repositoryDiskFolder: DiskFolderService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			systemId: true,
			parentId: true,
			path: true,
			name: true,
			description: true,
			type: true,
			size: true,
			isNotDelete: true,
			isDeleted: true,
		});
	}

	protected oneGetColumns(customColumns: object = {}): object {
		return ({
			...super.oneGetColumns(customColumns),
			userId: true,
			systemId: true,
			parentId: true,
			path: true,
			name: true,
			description: true,
			type: true,
			size: true,
			isNotDelete: true,
			isDeleted: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			path: true,
			name: true,
			description: true,
		});
	}

	public async createProperties(payload: object): Promise<object> {
		const output = { ...payload };

		if (output['parentId']) {
			const parentFolder =await this.repository.findOne({
				select: {
					id: true,
					systemId: true,
					path: true,
				},
				where: {
					id: output['parentId'],
				},
			});

			output['systemId'] = parentFolder['systemId'];
			output['path'] = parentFolder['path'];
		}
		else if (output['systemId'] && output['path']) {
			const systemOptionContent = await this.repositorySystemOptionContent.findOne({
				select: {
					id: true,
					systemId: true,
					content: true,
				},
				where: {
					systemId: output['systemId'],
				},
			});

			output['parentId'] = ((await this.repository.findOne({
				select: {
					id: true,
					systemId: true,
					path: true,
				},
				where: {
					systemId: output['systemId'],
					path: output['path'],
				},
			})) || {})['id'];
		}
		output['path'] = (output['path'][output['path'].length - 1] === '/')
			? `${output['path']}${output['name']}`
			: `${output['path']}/${output['name']}`;

		return await super.createProperties(output);
	}

	protected async createAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		return await this.after(initialPayload, processedPayload, {
			...await this.repositoryDiskFolder.createProcess(data, initialPayload),
			...data, 
		});
	}

	protected async updateAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		const folder = await this.repository.findOne({
			select: {
				id: true,
				path: true,
			},
			where: { 
				id: processedPayload['id'],
			},
		});

		if (this.repositoryDiskFolder.nameByPath(folder['path']) !== processedPayload['name']) {
			await this.syncChildsInDb(folder, processedPayload);
			await this.repositoryDiskFolder.updateProcess(processedPayload['id'], { path: folder['path'], ...processedPayload }, initialPayload);
		}
		return await this.after(initialPayload, processedPayload, data);
	}

	public async dropProcess(processedPayload: object | string, payload: object): Promise<any> {
		const id = utilsCheckObjFilled(processedPayload)
			? String((processedPayload || {})['id'])
			: String(processedPayload);

		if (this.withCache === true) {
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'many', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'one', { id } ] });
		}
		if (!this.withTwoStepRemoval) {
			return await this.dropProcessForever(id);
		}
		const entity = (utilsCheckObjFilled(processedPayload) && utilsCheckBool(processedPayload['isDeleted']))
			? processedPayload
			: (await this.repository.findOne({
				select: {
					id: true,
					isDeleted: true,
					path: true,
				},
				where: {
					id,
				},
			}));

		if (entity['isDeleted']) {
			await this.dropProcessForever(id);
			await this.repositoryDiskFolder.dropProcess({ path: entity['path'] }, payload);
			await this.dropByParent(id);
		}
		else {
			await this.dropProcessPrepare(id);
		}
		return entity;
	}

	protected async dropByParent(id: string): Promise<any> {
		const folders = await this.repository.find({
			select: {
				id: true,
			},
			where: {
				parentId: id,
			},
		});

		const files = await this.repositoryFile.find({
			select: {
				id: true,
			},
			where: {
				parentId: id,
			},
		});

		if(folders.length > 0) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				? await this.queryRunner.manager.delete(this.repositoryConstructor, folders.map((item) => item['id']))
				: await this.repository.delete(folders.map((item) => item['id']));
		}

		if(files.length > 0) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				? await this.queryRunner.manager.delete(this.repositoryFileConstructor, files.map((item) => item['id']))
				: await this.repositoryFile.delete(files.map((item) => item['id']));
		}

		return true;
	}

	protected async syncChildsInDb(folder: object, payload: object): Promise<any> {
		const oldPath = folder['path'];
		const newPath = this.repositoryDiskFolder.path(folder['path'], payload['name'], true);
		const folders = await this.repository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${oldPath}/%`),
			},
		});
		let i = 0;

		while (i < folders.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				?  await this.queryRunner.manager.update(this.repositoryConstructor, folders[i]['id'], {
					path: folders[i]['path'].replace(`${oldPath}/`, `${newPath}/`),
				})
				: await this.repository.update({ id: folders[i]['id'] }, {
					path: folders[i]['path'].replace(`${oldPath}/`, `${newPath}/`),
				});
			i++;
		}
		const files = await this.repositoryFile.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${oldPath}/%`),
			},
		});

		i = 0;

		while (i < files.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				? await this.queryRunner.manager.update(this.repositoryFileConstructor, files[i]['id'], {
					path: files[i]['path'].replace(`${oldPath}/`, `${newPath}/`),
				})
				: await this.repositoryFile.update({ id: files[i]['id'] }, {
					path: files[i]['path'].replace(`${oldPath}/`, `${newPath}/`),
				});
			i++;
		}
		return await this.updateProcess(folder['id'], { path: newPath }, payload);
	}

	protected async dropManyProperties(payload): Promise<object> {
		return { ...payload, ids: payload['ids'] };
	}

	protected async dropManyProcess(processedPayload: Array<string>, payload: object): Promise<any> {
		let i = 0;

		while (i < processedPayload['ids'].length) {
			await this.dropProcess(processedPayload['ids'][i], payload);
			i++;
		}

		return true;
	}
}
