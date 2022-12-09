import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
	RequestMethod,
} from '@nestjs/common';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderController } from './provider.controller';
import { ProviderService } from '../api/provider/provider.service';
import { System } from '../api/system/system.entity';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';
import { ProviderProviderProviderOption } from '../api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../api/provider-provider-option/provider-provider-option.entity';
import { Provider } from '../api/provider/provider.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			ProviderStatus,
			ProviderProviderProviderOption,
			ProviderProviderOption,
			Provider,
		]),
	],
	controllers: [ ProviderController ],
	providers: [ 
		BalancerRepository,
		BalancerService,
		CacheService,
		ProviderService,
	],
})
export class ProviderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
