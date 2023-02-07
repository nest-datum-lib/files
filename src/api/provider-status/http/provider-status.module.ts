import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
	RequestMethod,
} from '@nestjs/common';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { ProviderStatusController } from './provider-status.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ ProviderStatusController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class ProviderStatusModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
