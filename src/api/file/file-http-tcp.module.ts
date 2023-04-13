import { Module } from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { FileService as DiskFileService } from '@nest-datum/disk';
import { FileService } from './file.service';
import { FileHttpTcpController } from './file-http-tcp.controller';

@Module({
	controllers: [
		FileHttpTcpController, 
	],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		DiskFileService,
		FileService,
	],
})
export class FileHttpTcpModule {
}
