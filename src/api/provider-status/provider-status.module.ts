import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
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
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		ProviderStatusService, 
	],
})
export class ProviderStatusModule {
}
