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
import { SystemController } from './system.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ SystemController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class SystemModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
