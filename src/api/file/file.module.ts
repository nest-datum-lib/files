import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
	controllers: [ FileController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Folder,
			File, 
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		FileService, 
	],
})
export class FileModule {
}

