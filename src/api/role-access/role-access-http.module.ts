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
import { RoleAccessService } from './role-access.service';
import { RoleAccessHttpController } from './role-access-http.controller';
import { Access } from '../access/access.entity';
import { RoleAccess } from './role-access.entity';

@Module({
	controllers: [ RoleAccessHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Access,
			RoleAccess,
		]),
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
		RoleAccessService, 
	],
})
export class RoleAccessHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
