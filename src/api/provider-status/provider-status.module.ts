import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { 
	CacheService,
	CacheModule, 
} from 'nest-datum/cache/src';
import { Provider } from '../provider/provider.entity';
import { ProviderStatus } from './provider-status.entity';
import { ProviderStatusService } from './provider-status.service';
import { ProviderStatusController } from './provider-status.controller';

@Module({
	controllers: [ ProviderStatusController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Provider,
			ProviderStatus, 
		]),
		CacheModule,
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		ProviderStatusService, 
	],
})
export class ProviderStatusModule {
}
