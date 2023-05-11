import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { SystemHttpTcpController } from './system-http-tcp.controller';
import { FileService } from '../../api/file/file.service'; 
import { FolderService } from '../../api/folder/folder.service'; 

@Module({
	controllers: [ SystemHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
		FileService,
		FolderService
	],
})
export class SystemHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
