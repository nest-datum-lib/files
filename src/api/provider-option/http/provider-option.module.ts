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
import { ProviderOptionController } from './provider-option.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ ProviderOptionController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class ProviderOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
