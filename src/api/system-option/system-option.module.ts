import { Module } from '@nestjs/common';
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
import { SystemOptionService } from './system-option.service';
import { SystemOptionController } from './system-option.controller';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { System } from '../system/system.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';

@Module({
	controllers: [ SystemOptionController ],
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
export class SystemOptionModule {
}

