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
import { SystemSystemOptionController } from './system-system-option.controller';
import { SystemSystemOptionService } from '../system-system-option.service';
import { SystemSystemOption } from '../system-system-option.entity';
import { SystemSystemSystemOption } from '../../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../../system-option/system-option.entity';
import { System } from '../../system/system.entity';

@Module({
	controllers: [ SystemSystemOptionController ],
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
		SystemSystemOptionService, 
	],
})
export class SystemSystemOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
