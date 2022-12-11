import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderProviderOptionController } from './provider-provider-option.controller';
import { ProviderProviderOptionService } from './provider-provider-option.service';
import { ProviderProviderOption } from './provider-provider-option.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Module({
	controllers: [ ProviderProviderOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderProviderOption,
			ProviderProviderProviderOption,
			ProviderOption,
			Provider, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		ProviderProviderOptionService, 
	],
})
export class ProviderProviderOptionModule {
}
