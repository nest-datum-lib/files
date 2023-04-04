import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from './provider-provider-option.entity';


export class ProviderProviderOptionService extends BindService {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';
	protected repositoryConstructor = ProviderProviderOption;
	
	constructor(
		@InjectRepository(ProviderProviderOption) protected repository: Repository<ProviderProviderOption>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
