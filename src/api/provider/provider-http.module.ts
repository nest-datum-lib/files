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
import { ProviderService } from './provider.service';
import { ProviderHttpController } from './provider-http.controller';
import { ProviderProviderOptionService } from '../provider-provider-option/provider-provider-option.service';
import { ProviderProviderProviderOptionService } from '../provider-provider-provider-option/provider-provider-provider-option.service';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from './provider.entity';

@Module({
	controllers: [ ProviderHttpController ],
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
		ProviderProviderProviderOptionService,
		ProviderService,
	],
})
export class ProviderHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
