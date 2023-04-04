import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { MainService } from '@nest-datum/main';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from './provider.entity';

@Injectable()
export class ProviderService extends MainService {
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly enableTransactions: boolean = true;
	protected readonly repositoryConstructor = Provider;
	protected readonly repositoryBindOptionConstructor = ProviderProviderOption;
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';

	constructor(
		@InjectRepository(Provider) protected readonly repository: Repository<Provider>,
		@InjectRepository(ProviderProviderOption) protected repositoryBindOption: Repository<ProviderProviderOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			providerStatusId: true,
			name: true,
			description: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			name: true,
			description: true,
		});
	}
}
