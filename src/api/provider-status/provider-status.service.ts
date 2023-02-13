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
	protected entityName = 'providerStatus';
	protected entityConstructor = ProviderStatus;

	constructor(
		@InjectRepository(ProviderStatus) protected entityRepository: Repository<ProviderStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
