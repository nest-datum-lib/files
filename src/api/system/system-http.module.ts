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
import { SystemService } from './system.service';
import { SystemHttpController } from './system-http.controller';
import { SystemSystemOptionService } from '../system-system-option/system-system-option.service';
import { SystemSystemSystemOptionService } from '../system-system-system-option/system-system-system-option.service';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { Provider } from '../provider/provider.entity';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { System } from './system.entity';
import { FileService } from '../../api/file/file.service'; 
import { FileService as DiskFileService, FolderService as DiskFolderService } from '@nest-datum/disk';
import { FolderService } from '../../api/folder/folder.service'; 

@Module({
	controllers: [ SystemHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			Provider,
			Folder,
			File,
			System,
			SystemSystemSystemOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		SystemSystemOptionService,
		SystemSystemSystemOptionService,
		SystemService,
		DiskFileService,
		FileService,
		FolderService,
		DiskFolderService
	],
})
export class SystemHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
