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
import { ProviderStatusService } from './provider-status.service';
import { ProviderStatusHttpController } from './provider-status-http.controller';
import { ProviderStatus } from './provider-status.entity';

@Module({
	controllers: [ ProviderStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ ProviderStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ProviderStatusService, 
	],
})
export class ProviderStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
