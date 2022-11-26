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
import { SystemOptionController } from './system-option.controller';
import { SystemOptionService } from '../api/system-option/system-option.service';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';
import { SystemOption } from '../api/system-option/system-option.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			SystemSystemSystemOption, 
		]),
	],
	controllers: [ SystemOptionController ],
	providers: [ 
		RegistryService,
		LogsService,
		CacheService,
		SystemOptionService,
	],
})
export class SystemOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-option`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-option/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-option/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-option`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system-option/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
