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

export class ProviderOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';

	constructor(
		@InjectRepository(ProviderOption) protected readonly repository: Repository<ProviderOption>,
		@InjectRepository(ProviderProviderOption) protected readonly repositoryOption: Repository<ProviderProviderOption>,
		@InjectRepository(ProviderProviderProviderOption) public readonly contentManyService: Repository<ProviderProviderProviderOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
