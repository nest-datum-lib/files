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
import { SettingService } from './setting.service';
import { SettingHttpController } from './setting-http.controller';
import { Setting } from './setting.entity';

@Module({
	controllers: [ SettingHttpController ],
	imports: [
		TypeOrmModule.forFeature([ Setting ]),
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
		SettingService, 
	],
})
export class SettingHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
