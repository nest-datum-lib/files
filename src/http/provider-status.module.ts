import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
	RequestMethod,
} from '@nestjs/common';
import { 
	RegistryService,
	LogsService, 
	CacheService,
} from '@nest-datum/services';
import { ProviderStatusController } from './provider-status.controller';
import { ProviderStatusService } from '../api/provider-status/provider-status.service';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';
import { Provider } from '../api/provider/provider.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			Provider,
			ProviderStatus, 
		]),
	],
	controllers: [ ProviderStatusController ],
	providers: [ 
		RegistryService,
		LogsService,
		CacheService,
		ProviderStatusService,
	],
})
export class ProviderStatusModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-status`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-status/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-status/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-status`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-status/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
