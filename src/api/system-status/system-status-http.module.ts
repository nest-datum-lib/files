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
import { SystemStatusService } from './system-status.service';
import { SystemStatusHttpController } from './system-status-http.controller';
import { SystemStatus } from './system-status.entity';

@Module({
	controllers: [ SystemStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ SystemStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		SystemStatusService, 
	],
})
export class SystemStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
