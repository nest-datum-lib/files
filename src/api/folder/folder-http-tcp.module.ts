import { Module } from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FolderService } from './folder.service';
import { FolderHttpTcpController } from './folder-http-tcp.controller';

@Module({
	controllers: [ FolderHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
		FolderService,
	],
})
export class FolderHttpTcpModule {
}
