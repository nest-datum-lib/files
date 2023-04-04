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
import { SystemStatusHttpController } from './system-status-http.controller';
import { SystemStatusService } from './system-status.service';
import { SystemStatus } from './system-status.entity';

@Module({
	controllers: [ SystemStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ SystemStatus ]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		SystemStatusService, 
	],
})
export class SystemStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
