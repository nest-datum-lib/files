import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from './provider-option.entity';
import { ProviderOptionService } from './provider-option.service';
import { ProviderOptionController } from './provider-option.controller';

@Module({
	controllers: [ ProviderOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderOption,
			ProviderProviderOption, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		ProviderOptionService, 
	],
})
export class ProviderOptionModule {
}


