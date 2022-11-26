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
import { FolderController } from './folder.controller';
import { FolderService } from '../api/folder/folder.service';
import { File } from '../api/file/file.entity';
import { System } from '../api/system/system.entity';
import { Folder } from '../api/folder/folder.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			Folder,
			File,
			System, 
		]),
	],
	controllers: [ FolderController ],
	providers: [ 
		RegistryService,
		LogsService,
		CacheService,
		FolderService,
	],
})
export class FolderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder/:id`,
				method: RequestMethod.GET,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder/:id`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder`,
				method: RequestMethod.DELETE,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder`,
				method: RequestMethod.POST,
			});
		consumer
			.apply(
				// ExampleMiddleware,
			)
			.forRoutes({
				path: `${process.env.SERVICE_FILES}/folder/:id`,
				method: RequestMethod.PATCH,
			});
	}
}
