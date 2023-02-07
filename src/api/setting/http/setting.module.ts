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
import { SettingController } from './setting.controller';
import { SettingService } from '../setting.service';
import { Setting } from '../setting.entity';

@Module({
	controllers: [ SettingController ],
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
export class SettingModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
