import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { ProviderProviderOptionService } from './provider-provider-option.service';
import { ProviderProviderOptionHttpController } from './provider-provider-option-http.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { Provider } from '../provider/provider.entity';
import { ProviderProviderOption } from './provider-provider-option.entity';

@Module({
	controllers: [ ProviderProviderOptionHttpController ],
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
		ProviderProviderOptionService, 
	],
})
export class ProviderProviderOptionHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
