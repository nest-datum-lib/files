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
import { SystemController } from './system.controller';
import { SystemSystemOptionService } from '../api/system-system-option/system-system-option.service';
import { SystemService } from '../api/system/system.service';
import { Provider } from '../api/provider/provider.entity';
import { Folder } from '../api/folder/folder.entity';
import { File } from '../api/file/file.entity';
import { SystemStatus } from '../api/system-status/system-status.entity';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';
import { System } from '../api/system/system.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			SystemStatus,
			SystemSystemSystemOption,
			SystemSystemOption,
			System,
			Provider,
			Folder,
			File,
		]),
	],
	controllers: [ SystemController ],
	providers: [ 
		BalancerRepository,
		BalancerService,
		CacheService,
		SystemSystemOptionService,
		SystemService,
	],
})
export class SystemModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `system/option`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `system/option/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `system/option/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `system/:id/option`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `/system`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `/system/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `/system/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `/system`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `/system/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
