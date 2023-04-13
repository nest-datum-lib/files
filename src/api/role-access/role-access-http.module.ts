import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
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
		CacheModule,
	],
	providers: [
		CacheService,
		RoleAccessService, 
	],
})
export class RoleAccessHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
