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
import { SystemOptionOptionController } from './system-option-option.controller';
import { SystemOptionOptionService } from '../system-option-option.service';
import { SystemOptionOption } from '../system-option-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';

@Module({
	controllers: [ SystemOptionOptionController ],
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
	Systems: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		SystemOptionOptionService, 
	],
})
export class SystemOptionOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
