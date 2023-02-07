import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService as NestDatumOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from './provider-option.entity';

@Injectable()
export class ProviderOptionService extends NestDatumOptionService {
	public entityName = 'providerOption';
	public entityColumnOption = 'providerOptionId';
	public entityConstructor = ProviderOption;

	constructor(
		@InjectRepository(ProviderOption) public repository: Repository<ProviderOption>,
		@InjectRepository(ProviderProviderOption) public repositoryOptionOption: Repository<ProviderProviderOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, repositoryOptionOption, connection, cacheService);
	}
}
