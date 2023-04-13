import { 
	Module,
	NestModule,
	MiddlewareConsumer,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { SystemService } from './system.service';
import { SystemTcpController } from './system-tcp.controller';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { Provider } from '../provider/provider.entity';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { System } from './system.entity';

@Module({
	controllers: [ SystemTcpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			Provider,
			Folder,
			File,
			System,
			SystemSystemSystemOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		SystemService,
	],
})
export class SystemTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
