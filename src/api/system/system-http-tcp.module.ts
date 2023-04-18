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

@Module({
	controllers: [ SystemHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
	],
})
export class SystemHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
