import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { System } from '../system/system.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { FolderModule } from '../folder/folder.module';
import { FolderService } from '../folder/folder.service';
import { Folder } from '../folder/folder.entity';

@Module({
	controllers: [ FileController ],
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			Folder,
			File,
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
		FolderModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		FolderService,
		FileService, 
	],
})
export class FileModule {
}

