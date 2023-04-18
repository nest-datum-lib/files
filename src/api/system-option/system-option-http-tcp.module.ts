import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { SystemOptionHttpTcpController } from './system-option-http-tcp.controller';

@Module({
	controllers: [ SystemOptionHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
	],
})
export class SystemOptionHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
