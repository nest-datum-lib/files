import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionEntityService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from './provider.entity';

@Injectable()
export class ProviderService extends OptionEntityService {
	protected entityName = 'provider';
	protected entityConstructor = Provider;
	protected entityOptionConstructor = ProviderProviderOption;
	protected entityOptionId = 'providerOptionId';
	protected entityId = 'providerId';

	constructor(
		@InjectRepository(Provider) protected entityRepository: Repository<Provider>,
		@InjectRepository(ProviderProviderOption) protected entityOptionRepository: Repository<ProviderProviderOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
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
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
		});
	}
}
