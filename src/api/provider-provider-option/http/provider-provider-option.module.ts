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
import { ProviderProviderOptionController } from './provider-provider-option.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ ProviderProviderOptionController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class ProviderProviderOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
