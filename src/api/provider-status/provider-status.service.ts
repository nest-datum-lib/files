import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService as NestDatumStatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ProviderStatus } from './provider-status.entity';

@Injectable()
export class ProviderStatusService extends NestDatumStatusService {
	public entityConstructor = ProviderStatus;

	constructor(
		@InjectRepository(ProviderStatus) public repository: Repository<ProviderStatus>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}
}
