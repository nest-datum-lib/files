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
import { FolderController } from './folder.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ FolderController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class FolderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
