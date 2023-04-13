import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from './provider-option.entity';

@Injectable()
export class ProviderOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';
	protected readonly repositoryConstructor = ProviderOption;
	protected readonly repositoryOptionConstructor = ProviderProviderOption;

	constructor(
		@InjectRepository(ProviderOption) protected readonly repository: Repository<ProviderOption>,
		@InjectRepository(ProviderProviderOption) public readonly repositoryOption: Repository<ProviderProviderOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
