import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from './provider-provider-option.entity';

@Injectable()
export class ProviderProviderOptionService extends OptionOptionService {
	protected entityName = 'providerProviderOption';
	protected entityConstructor = ProviderProviderOption;
	protected entityOptionId = 'providerOptionId';
	protected entityId = 'providerId';
	protected entityOptionName = 'providerOption';

	constructor(
		@InjectRepository(ProviderProviderOption) protected entityRepository: Repository<ProviderProviderOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
