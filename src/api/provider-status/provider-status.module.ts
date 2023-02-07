import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { ProviderStatusService } from './provider-status.service';
import { ProviderStatusController } from './provider-status.controller';
import { ProviderStatus } from './provider-status.entity';

@Module({
	controllers: [ ProviderStatusController ],
	imports: [
		TypeOrmModule.forFeature([ ProviderStatus ]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
		ProviderStatusService,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		ProviderStatusService, 
	],
})
export class ProviderStatusModule {
}

