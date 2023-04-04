import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { SystemStatus } from './system-status.entity';

export class SystemStatusService extends StatusService {
	protected readonly repositoryConstructor = SystemStatus;

	constructor(
		@InjectRepository(SystemStatus) protected repository: Repository<SystemStatus>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
