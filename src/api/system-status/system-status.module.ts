import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
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
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		SystemStatusService, 
	],
})
export class SystemStatusModule {
}
