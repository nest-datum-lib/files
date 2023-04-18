import { Module } from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FileService } from './file.service';
import { FileHttpTcpController } from './file-http-tcp.controller';

@Module({
	controllers: [ FileHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
		FileService,
	],
})
export class FileHttpTcpModule {
}
