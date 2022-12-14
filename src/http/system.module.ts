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
import { SystemController } from './system.controller';
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
		RegistryService,
		LogsService,
		CacheService,
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
				path: `${process.env.SERVICE_FILES}/system`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/system/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
