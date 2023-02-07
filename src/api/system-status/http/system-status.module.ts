import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
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
import { SystemStatusController } from './system-status.controller';
import { SystemStatusService } from '../system-status.service';
import { SystemStatus } from '../system-status.entity';

@Module({
	controllers: [ SystemStatusController ],
	imports: [
		TypeOrmModule.forFeature([ SystemStatus ]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	Systems: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		SystemStatusService, 
	],
})
export class SystemStatusModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
