import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { SystemStatusService } from './system-status.service';
import { SystemStatusTcpController } from './system-status-tcp.controller';
import { SystemStatus } from './system-status.entity';

@Module({
	controllers: [ SystemStatusTcpController ],
	imports: [
		TypeOrmModule.forFeature([ SystemStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		SystemStatusService, 
	],
})
export class SystemStatusTcpModule {
}

