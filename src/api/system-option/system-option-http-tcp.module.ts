import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { SystemOptionService } from './system-option.service';
import { SystemOptionHttpTcpController } from './system-option-http-tcp.controller';

@Module({
	controllers: [ SystemOptionHttpTcpController ],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		SystemOptionService,
	],
})
export class SystemOptionHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
