import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import {
	strIdExists as utilsCheckStrIdExists,
	objFilled as utilsCheckObjFilled,
	objQueryRunner as utilsCheckObjQueryRunner,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';
import { FuseService } from '@nest-datum/fuse';
import { CacheService } from '@nest-datum/cache';
import { FileService as DiskFileService } from '@nest-datum/disk';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';

@Injectable()
export class FileService extends FuseService {
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly withEnvKey: boolean = false;
	protected readonly repositoryConstructor = File;

	constructor(
		@InjectRepository(File) protected readonly repository: Repository<File>,
		@InjectRepository(Folder) protected readonly repositoryFolder: Repository<Folder>,
		@InjectRepository(SystemSystemSystemOption) protected readonly repositorySystemOptionContent: Repository<SystemSystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
		protected readonly repositoryDiskFile: DiskFileService,
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
			const parentFolder =await this.repositoryFolder.findOne({
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

			output['parentId'] = ((await this.repositoryFolder.findOne({
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
		if (output['systemId'] === 'files-system-avatars') {
			output['forceName'] = `${payload['userId']}.jpg`;
			output['force'] = true;
		}
		return await super.createProperties(output);
	}

	public async updateProperties(payload: object): Promise<object> {
		const parentFolder = await this.repositoryFolder.findOne({
			select: {
				id: true,
				systemId: true,
			},
			where: {
				id: payload['id'],
			},
		});

		if (parentFolder && parentFolder['systemId'] === 'files-system-avatars') {
			payload['name'] = `${payload['userId']}.jpg`;
			payload['force'] = true;
		}
		return await super.updateProperties(payload);
	}

	protected async createProcess(processedPayload: object, payload: object): Promise<object> {
		const files = Array.from(await this.repositoryDiskFile.createProcess(processedPayload, payload));
		let i = 0,
			output = [];

		try {
			if (this.withCache === true) {
				this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'many', '*' ] });
			}
			while (i < files.length) {
				files[i]['systemId'] = processedPayload['systemId'];
				files[i]['parentId'] = processedPayload['parentId'];
				files[i]['userId'] = processedPayload['userId'];
				
				const model = await this.repository.findOne({
					where: {
						path: files[i]['path'],
					},
				});

				if (model) {
					output.push(model);
				}
				else {
					output.push((utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
						? await this.queryRunner.manager.save(Object.assign(new this.repositoryConstructor(), files[i]))
						: await this.repository.save(files[i]));
				}
				i++;
			}
		}
		catch (err) {
			await this.rollbackQueryRunnerManager();

			throw err;
		}
		finally {
			await this.dropQueryRunnerManager();
		}
		return output;
	}

	protected async updateProcess(id: string, processedPayload: object, payload: object): Promise<object> {
		if (processedPayload['newId']) {
			processedPayload['id'] = processedPayload['newId'];

			delete processedPayload['newId'];
		}
		if (this.withCache === true) {
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'many', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'one', { id } ] });
		}
		if (processedPayload['name']) {
			const currentFile = await this.repository.findOne({
				select: {
					id: true,
					path: true,
					name: true,
				},
				where: {
					id,
				},
			});

			if (currentFile['name'] !== processedPayload['name']) {
				await this.repositoryDiskFile.updateProcess(id, { path: currentFile['path'], ...processedPayload }, payload);
			
				processedPayload['path'] = this.repositoryDiskFile.path(currentFile['path'], processedPayload['name'], true);
			}
		}
		return (utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
			? await this.queryRunner.manager.update(this.repositoryConstructor, id, processedPayload)
			: await this.repository.update({ id }, processedPayload);
	}

	protected async dropProcess(processedPayload: object | string, payload: object): Promise<any> {
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
			await this.repositoryDiskFile.dropProcess({ path: entity['path'] }, payload);
		}
		else {
			await this.dropProcessPrepare(id);
		}
		return entity;
	}
}
