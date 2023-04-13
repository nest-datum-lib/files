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
import { ProviderTcpController } from './provider-tcp.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from './provider.entity';

@Module({
	controllers: [ ProviderTcpController ],
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
		ProviderService,
	],
})
export class ProviderTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
