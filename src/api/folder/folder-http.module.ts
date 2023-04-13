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
import { FolderService as DiskFolderService } from '@nest-datum/disk';
import { FolderHttpController } from './folder-http.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { File } from '../file/file.entity';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';

@Module({
	controllers: [ FolderHttpController ],
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
		DiskFolderService,
		FolderService,
	],
})
export class FolderHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
