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
import { AccessStatusService } from './access-status.service';
import { AccessStatusHttpController } from './access-status-http.controller';
import { AccessStatus } from './access-status.entity';

@Module({
	controllers: [ AccessStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ AccessStatus ]),
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
		AccessStatusService, 
	],
})
export class AccessStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
