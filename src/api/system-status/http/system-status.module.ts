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
import { SystemStatusController } from './system-status.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ SystemStatusController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class SystemStatusModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
