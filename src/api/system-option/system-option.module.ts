import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';
import { SystemOptionService } from './system-option.service';
import { SystemOptionController } from './system-option.controller';

@Module({
	controllers: [ SystemOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption, 
		]),
	],
	Systems: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		SystemOptionService, 
	],
})
export class SystemOptionModule {
}


