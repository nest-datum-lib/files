import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { SystemOptionService } from './system-option.service';
import { SystemOptionTcpController } from './system-option-tcp.controller';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';
import { SystemOption } from './system-option.entity';

@Module({
	controllers: [
		SystemOptionTcpController, 
	],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			System,
			SystemSystemSystemOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		SystemOptionService,
	],
})
export class SystemOptionTcpModule {
}
