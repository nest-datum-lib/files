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
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly enableTransactions: boolean = true;
	protected readonly repositoryConstructor = Folder;
	protected readonly repositoryFileConstructor = File;

	constructor(
		@InjectRepository(Folder) protected readonly repository: Repository<Folder>,
		@InjectRepository(File) protected readonly repositoryFile: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) protected readonly repositorySystemOptionContent: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) protected readonly repositoryProviderOptionContent: Repository<ProviderProviderProviderOption>,
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
			parentId: true,
			path: true,
			name: true,
			description: true,
			systemId: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			path: true,
			name: true,
			description: true,
		});
	}

	protected async createProperties(payload: object): Promise<object> {
		return await super.createProperties(await this.repositoryDiskFolder.createProperties(payload));
	}

	protected async createAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		if (!processedPayload['path']) {
			if (!utilsCheckStrId(processedPayload['systemId'])) {
				if (!utilsCheckStrId(processedPayload['parentId'])) {
					throw new MethodNotAllowedException(`Property "parentId" is not valid.`);
				}
				processedPayload['parent'] = await this.repository.findOne({
					select: {
						id: true,
						path: true,
					},
					where: {
						id: processedPayload['parentId'],
					},
				});
			}
			else {
				processedPayload['path'] = await this.pathBySystem(processedPayload['systemId']);
			}
		}
		const path = `${processedPayload['path']}${processedPayload['name'] ? ('/'+ processedPayload['name']) : ''}`;

		return await this.after(initialPayload, processedPayload, {
			...await this.repositoryDiskFolder.create({ path }),
			...data, 
		});
	}

	protected async updateAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		const folder = this.repository.findOne({
			select: {
				id: true,
				name: true,
				path: true,
			},
			where: { 
				id: processedPayload['id'],
			},
		});

		if (!folder) {
			throw new NotFoundException(`Folder "${processedPayload['id']}" is undefined.`);
		}
		if (utilsCheckStrFilled(initialPayload['path']) && initialPayload['path'] !== folder['path']) {
			await this.repositoryDiskFolder.update({ path: folder['path'], name: this.repositoryDiskFolder.nameByPath(initialPayload['path']) });
		}
		else if (utilsCheckStrFileName(initialPayload['name'])) {
			await this.syncChildsPath(folder['path'], this.repositoryDiskFolder.path(folder['path'], initialPayload['name']));
			await this.repositoryDiskFolder.update({ path: folder['path'], name: initialPayload['name'] });
		}
		return await this.after(initialPayload, processedPayload, data);
	}

	protected async dropProcess(processedPayload: object | string, payload: object): Promise<any> {
		const folder = await super.dropProcess(processedPayload, payload);
		const folderIds = (await this.repository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		})).map((item) => item.id);
		const fileIds = (await this.repositoryFile.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${folder['path']}/%`),
			},
		})).map((item) => item.id);

		(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
			? await this.queryRunner.manager.delete(this.repositoryFileConstructor, fileIds)
			: await this.repositoryFile.delete(fileIds);
		await this.dropManyProcess(folderIds, { ids: folderIds });
	}

	protected async pathBySystem(systemId: string, properties: object = {}): Promise<string> {
		const systemOptionId = properties['systemOptionId'] ?? 'files-system-option-root';
		const providerOptionId = properties['providerOptionId'] ?? 'files-provider-option-root-path';
		const systemOptionContent = await this.repositorySystemOptionContent.findOne({
			select: {
				id: true,
				systemId: true,
				content: true,
			},
			where:{
				systemId,
				systemSystemOption: {
					systemOption: {
						id: systemOptionId,
					},
				},
			},
			relations: {
				system: true,
			},
		});

		if (!systemOptionContent || !systemOptionContent['system']) {
			throw new FailureException('File system is undefined.');
		}
		const provider = await this.repositoryProviderOptionContent.findOne({
			select: {
				id: true,
				providerId: true,
				content: true,
			},
			where:{
				providerId: systemOptionContent['system']['providerId'],
				providerProviderOption: {
					providerOption: {
						id: providerOptionId,
					},
				},
			},
		});

		if (!provider) {
			throw new FailureException('Provider is undefined.');
		}
		return ((provider['content'] === '/') ? '' : (provider['content']) + systemOptionContent['content']);
	}

	protected async syncChildsPath(currentPath: string, newPath: string): Promise<any> {
		const folders = await this.repository.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${currentPath}/%`),
			},
		});
		let i = 0;

		while (i < folders.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				?  await this.queryRunner.manager.update(this.repositoryConstructor, folders[i]['id'], {
					path: folders[i]['path'].replace(`${currentPath}/`, `${newPath}/`),
				})
				: await this.repository.update({ id: folders[i]['id'] }, {
					path: folders[i]['path'].replace(`${currentPath}/`, `${newPath}/`),
				});
			i++;
		}
		const files = await this.repositoryFile.find({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: Like(`${currentPath}/%`),
			},
		});

		i = 0;

		while (i < files.length) {
			(utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true)
				? await this.queryRunner.manager.update(this.repositoryFileConstructor, files[i]['id'], {
					path: files[i]['path'].replace(`${currentPath}/`, `${newPath}/`),
				})
				: await this.repositoryFile.update({ id: files[i]['id'] }, {
					path: files[i]['path'].replace(`${currentPath}/`, `${newPath}/`),
				});
			i++;
		}
		return {
			folders,
			files,
		};
	}
}
