import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService as NestDatumStatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { SystemStatus } from './system-status.entity';

@Injectable()
export class SystemStatusService extends NestDatumStatusService {
	public entityConstructor = SystemStatus;

	constructor(
		@InjectRepository(SystemStatus) public repository: Repository<SystemStatus>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}
}
