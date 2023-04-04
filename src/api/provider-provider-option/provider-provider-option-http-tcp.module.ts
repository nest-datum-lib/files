import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { ProviderProviderOptionHttpTcpController } from './provider-provider-option-http-tcp.controller';

@Module({
	imports: [ 
		TransportModule, 
	],
	controllers: [ ProviderProviderOptionHttpTcpController ],
	providers: [ 
		TransportService, 
	],
})
export class ProviderProviderOptionHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
