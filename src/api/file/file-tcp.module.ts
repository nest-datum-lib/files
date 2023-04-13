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
import { FileService as DiskFileService } from '@nest-datum/disk';
import { FileTcpController } from './file-tcp.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';
import { FileService } from './file.service';

@Module({
	controllers: [ FileTcpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			Folder,
			File, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		DiskFileService,
		FileService,
	],
})
export class FileTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
