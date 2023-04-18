import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { ProviderHttpTcpController } from './provider-http-tcp.controller';

@Module({
	controllers: [ ProviderHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService, 
	],
})
export class ProviderHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
