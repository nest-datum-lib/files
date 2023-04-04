import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { ProviderOptionService } from './provider-option.service';
import { ProviderOptionHttpTcpController } from './provider-option-http-tcp.controller';

@Module({
	controllers: [ ProviderOptionHttpTcpController ],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		ProviderOptionService,
	],
})
export class ProviderOptionHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
