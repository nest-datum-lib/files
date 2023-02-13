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
	protected entityName = 'systemStatus';
	protected entityConstructor = SystemStatus;

	constructor(
		@InjectRepository(SystemStatus) protected entityRepository: Repository<SystemStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
