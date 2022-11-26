import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService,
} from '@nest-datum/services';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
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
			ProviderProviderProviderOption, 
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		ProviderOptionService, 
	],
})
export class ProviderOptionModule {
}


