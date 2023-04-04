import { Module } from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { ProviderService } from './provider.service';
import { ProviderHttpTcpController } from './provider-http-tcp.controller';

@Module({
	controllers: [
		ProviderHttpTcpController, 
	],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		ProviderService,
	],
})
export class ProviderHttpTcpModule {
}
