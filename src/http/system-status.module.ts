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
import { SystemStatusController } from './system-status.controller';
import { SystemStatusService } from '../api/system-status/system-status.service';
import { System } from '../api/system/system.entity';
import { SystemStatus } from '../api/system-status/system-status.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			SystemStatus, 
		]),
	],
	controllers: [ SystemStatusController ],
	providers: [ 
		RegistryService,
		LogsService,
		CacheService,
		SystemStatusService,
	],
})
export class SystemStatusModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-status`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-status/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-status/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-status`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-status/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
