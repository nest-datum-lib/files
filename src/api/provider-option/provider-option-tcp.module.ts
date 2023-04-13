import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { ProviderOptionService } from './provider-option.service';
import { ProviderOptionTcpController } from './provider-option-tcp.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';
import { ProviderOption } from './provider-option.entity';

@Module({
	controllers: [
		ProviderOptionTcpController, 
	],
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderOption,
			ProviderProviderOption,
			Provider,
			ProviderProviderProviderOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		ProviderOptionService,
	],
})
export class ProviderOptionTcpModule {
}
