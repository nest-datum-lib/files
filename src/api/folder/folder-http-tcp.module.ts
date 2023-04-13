import { Module } from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { FolderService as DiskFolderService } from '@nest-datum/disk';
import { FolderService } from './folder.service';
import { FolderHttpTcpController } from './folder-http-tcp.controller';

@Module({
	controllers: [
		FolderHttpTcpController, 
	],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		DiskFolderService,
		FolderService,
	],
})
export class FolderHttpTcpModule {
}
