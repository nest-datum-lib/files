import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { SystemSystemOptionController } from './system-system-option.controller';
import { SystemSystemOptionService } from './system-system-option.service';
import { SystemSystemOption } from './system-system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';

@Module({
	controllers: [ SystemSystemOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemSystemOption,
			SystemSystemSystemOption,
			SystemOption,
			System, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		SystemSystemOptionService, 
	],
})
export class SystemSystemOptionModule {
}
