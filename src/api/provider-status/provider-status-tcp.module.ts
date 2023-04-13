import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { ProviderStatusService } from './provider-status.service';
import { ProviderStatusTcpController } from './provider-status-tcp.controller';
import { ProviderStatus } from './provider-status.entity';

@Module({
	controllers: [ ProviderStatusTcpController ],
	imports: [
		TypeOrmModule.forFeature([ ProviderStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ProviderStatusService, 
	],
})
export class ProviderStatusTcpModule {
}

