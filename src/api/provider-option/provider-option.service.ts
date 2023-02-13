import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from './provider-option.entity';

@Injectable()
export class ProviderOptionService extends OptionService {
	protected entityName = 'providerOption';
	protected entityServicedName = 'provider';
	protected entityId = 'providerId';
	protected entityOptionId = 'providerOptionId';
	protected entityOptionRelationId = 'providerProviderOptionId';
	protected entityConstructor = ProviderOption;
	protected entityOptionConstructor = ProviderProviderOption;
	protected entityOptionRelationConstructor = ProviderProviderProviderOption;

	constructor(
		@InjectRepository(ProviderOption) protected entityRepository: Repository<ProviderOption>,
		@InjectRepository(ProviderProviderOption) protected entityOptionRepository: Repository<ProviderProviderOption>,
		@InjectRepository(ProviderProviderProviderOption) protected entityOptionRelationRepository: Repository<ProviderProviderProviderOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
