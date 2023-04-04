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
import { SystemOptionHttpController } from './system-option-http.controller';
import { SystemOptionService } from './system-option.service';
import { SystemOption } from './system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { System } from '../system/system.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';

@Module({
	controllers: [ SystemOptionHttpController ],
	imports: [
		TypeOrmModule.forFeature([
			SystemOption,
			SystemSystemOption,
			System,
			SystemSystemSystemOption,
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
		SystemOptionService, 
	],
})
export class SystemOptionHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
