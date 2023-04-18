import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { ProviderOptionHttpTcpController } from './provider-option-http-tcp.controller';

@Module({
	controllers: [ ProviderOptionHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService,
	],
})
export class ProviderOptionHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
