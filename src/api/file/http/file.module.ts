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
import { FileController } from './file.controller';
import { FileService } from '../file.service';
import { File } from '../file.entity';
import { ProviderProviderProviderOption } from '../../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../../provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from '../../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../../system-system-option/system-system-option.entity';
import { Folder } from '../../folder/folder.entity';

@Module({
	controllers: [ FileController ],
	imports: [
		TypeOrmModule.forFeature([ 
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
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		FileService, 
	],
})
export class FileModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
