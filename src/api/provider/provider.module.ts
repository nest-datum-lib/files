import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { System } from '../system/system.entity';
import { ProviderStatus } from '../provider-status/provider-status.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from './provider.entity';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';

@Module({
	controllers: [ ProviderController ],
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			ProviderStatus,
			ProviderProviderProviderOption,
			ProviderProviderOption,
			Provider,
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		ProviderService, 
	],
})
export class ProviderModule {
}

