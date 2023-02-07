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
import { FileController } from './file.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ FileController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class FileModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
