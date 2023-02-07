import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService as NestDatumOptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { ProviderProviderOption } from './provider-provider-option.entity';

@Injectable()
export class ProviderProviderOptionService extends NestDatumOptionOptionService {
	public entityName = 'providerProviderOption';
	public entityConstructor = ProviderProviderOption;

	constructor(
		@InjectRepository(ProviderProviderOption) public repository: Repository<ProviderProviderOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}

	protected selectDefaultMany = {
		id: true,
		providerId: true,
		providerOptionId: true,
		createdAt: true,
		updatedAt: true,
	};
}
