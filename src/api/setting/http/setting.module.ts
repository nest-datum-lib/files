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
import { SettingController } from './setting.controller';

@Module({
	imports: [ 
		ReplicaModule,
		TransportModule, 
	],
	controllers: [ SettingController ],
	providers: [ 
		ReplicaService,
		TransportService, 
	],
})
export class SettingModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
