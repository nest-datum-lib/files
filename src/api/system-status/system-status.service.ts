import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { SystemStatus } from './system-status.entity';

@Injectable()
export class SystemStatusService extends StatusService {
	protected readonly entityName: string = 'systemStatus';
	protected readonly repositoryConstructor = SystemStatus;

	constructor(
		@InjectRepository(SystemStatus) protected readonly repository: Repository<SystemStatus>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
