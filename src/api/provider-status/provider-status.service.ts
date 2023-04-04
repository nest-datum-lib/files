import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ProviderStatus } from './provider-status.entity';

export class ProviderStatusService extends StatusService {
	protected readonly repositoryConstructor = ProviderStatus;

	constructor(
		@InjectRepository(ProviderStatus) protected repository: Repository<ProviderStatus>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
