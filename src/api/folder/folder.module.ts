import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { File } from '../file/file.entity';
import { System } from '../system/system.entity';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';

@Module({
	controllers: [ FolderController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Folder,
			File,
			System, 
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		FolderService, 
	],
})
export class FolderModule {
}

