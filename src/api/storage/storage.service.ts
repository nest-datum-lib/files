import { Injectable } from '@nestjs/common';
import { SqlService } from '@nest-datum/sql';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
} from '@nest-datum-utils/check';

@Injectable()
export class StorageService extends SqlService {
	protected systemSystemSystemOptionRepository;
	protected providerProviderProviderOptionRepository;
	protected entityRepository;
	protected folderRepository;

	public async getPathBySystemId(systemId: string): Promise<any> {
		const systemOptionContent = await this.systemSystemSystemOptionRepository.findOne({
			select: {
				id: true,
				systemId: true,
				content: true,
			},
			where:{
				systemId,
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
			return new Error('File system is undefined.');
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
			return new Error('Provider is undefined.');
		}
		return ((provider['content'] === '/')
			? ''
			: (provider['content']) + systemOptionContent['content']);
	}

	public async getByPath({ parentId, path }: { parentId?: string; path?: string }): Promise<any> {
		const repository = this.folderRepository || this.entityRepository;

		return await repository.findOne({
			select: {
				id: true,
				path: true,
			},
			where: {
				...utilsCheckStrId(parentId)
					? { id: parentId }
					: (path && utilsCheckStr(path)
						? { path: path || '/' }
						: {}),
			},
		});
	}
}
