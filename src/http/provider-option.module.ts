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
import { ProviderOptionController } from './provider-option.controller';
import { ProviderOptionService } from '../api/provider-option/provider-option.service';
import { ProviderProviderProviderOption } from '../api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../api/provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from '../api/provider-option/provider-option.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderOption,
			ProviderProviderOption,
			ProviderProviderProviderOption, 
		]),
	],
	controllers: [ ProviderOptionController ],
	providers: [ 
		BalancerRepository,
		BalancerService,
		CacheService,
		ProviderOptionService,
	],
})
export class ProviderOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-option`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-option/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-option/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-option`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/provider-option/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
