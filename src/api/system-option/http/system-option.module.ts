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
import { SystemOptionController } from './system-option.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ SystemOptionController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class SystemOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
