import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { SystemController } from './system.controller';
import { SystemService } from '../system.service';
import { System } from '../system.entity';
import { Provider } from '../../provider/provider.entity';
import { Folder } from '../../folder/folder.entity';
import { File } from '../../file/file.entity';
import { SystemSystemSystemOption } from '../../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../../system-option/system-option.entity';
import { SystemSystemOption } from '../../system-system-option/system-system-option.entity';

@Module({
	controllers: [ SystemController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Provider,
			Folder,
			File,
			SystemOption,
			SystemSystemOption,
			System,
			SystemSystemSystemOption, 
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		SystemService, 
	],
})
export class SystemModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
