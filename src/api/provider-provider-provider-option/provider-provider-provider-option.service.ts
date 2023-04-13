import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { ContentManyService } from '@nest-datum/many';
import { ProviderProviderProviderOption } from './provider-provider-provider-option.entity';

@Injectable()
export class ProviderProviderProviderOptionService extends ContentManyService {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerProviderOptionId';
	protected readonly repositoryConstructor = ProviderProviderProviderOption;

	constructor(
		@InjectRepository(ProviderProviderProviderOption) protected readonly repository: Repository<ProviderProviderProviderOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
