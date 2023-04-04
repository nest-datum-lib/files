import { Module } from '@nestjs/common';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { SystemService } from './system.service';
import { SystemHttpTcpController } from './system-http-tcp.controller';

@Module({
	controllers: [
		SystemHttpTcpController, 
	],
	imports: [
		CacheModule,
	],
	providers: [ 
		CacheService,
		SystemService,
	],
})
export class SystemHttpTcpModule {
}
