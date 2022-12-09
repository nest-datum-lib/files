import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { 
	CacheService,
	CacheModule, 
} from 'nest-datum/cache/src';
import { System } from '../system/system.entity';
import { SystemStatus } from './system-status.entity';
import { SystemStatusService } from './system-status.service';
import { SystemStatusController } from './system-status.controller';

@Module({
	controllers: [ SystemStatusController ],
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			SystemStatus, 
		]),
		CacheModule,
		CacheService,
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		SystemStatusService, 
	],
})
export class SystemStatusModule {
}
