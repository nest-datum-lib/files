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
import { ProviderController } from './provider.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ ProviderController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class ProviderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
