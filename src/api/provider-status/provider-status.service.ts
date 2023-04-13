import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ProviderStatus } from './provider-status.entity';

@Injectable()
export class ProviderStatusService extends StatusService {
	protected readonly entityName: string = 'providerStatus';
	protected readonly repositoryConstructor = ProviderStatus;

	constructor(
		@InjectRepository(ProviderStatus) protected readonly repository: Repository<ProviderStatus>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
