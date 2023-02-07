import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
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
import { FolderController } from './folder.controller';
import { FolderService } from '../folder.service';
import { Folder } from '../folder.entity';
import { ProviderProviderProviderOption } from '../../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../../provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from '../../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../../system-system-option/system-system-option.entity';
import { File } from '../../file/file.entity';
import { System } from '../../system/system.entity';

@Module({
	controllers: [ FolderController ],
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			Folder,
			File,
			System, 
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		FolderService, 
	],
})
export class FolderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
