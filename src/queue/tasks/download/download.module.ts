import { Module } from '@nestjs/common';
import { RedisModule as NestjsRedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	redis,
	sql 
} from '@nest-datum-common/config';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	RedisModule,
	RedisService, 
} from '@nest-datum/redis';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { LoopService } from '@nest-datum/queue';
import { ProviderStatus } from '../../../api/provider-status/provider-status.entity';
import { ProviderOption } from '../../../api/provider-option/provider-option.entity';
import { ProviderProviderOption } from '../../../api/provider-provider-option/provider-provider-option.entity';
import { ProviderProviderProviderOption } from '../../../api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { Provider } from '../../../api/provider/provider.entity';
import { SystemStatus } from '../../../api/system-status/system-status.entity';
import { SystemOption } from '../../../api/system-option/system-option.entity';
import { SystemSystemOption } from '../../../api/system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../../../api/system-system-system-option/system-system-system-option.entity';
import { System } from '../../../api/system/system.entity';
import { Folder } from '../../../api/folder/folder.entity';
import { File } from '../../../api/file/file.entity';
import { Setting } from '../../../api/setting/setting.entity';
import { DownloadService } from './download.service';

@Module({
	controllers: [],
	imports: [
		NestjsRedisModule.forRoot(redis),
		TypeOrmModule.forRoot(sql),
		TypeOrmModule.forFeature([ 
			ProviderStatus,
			ProviderOption,
			ProviderProviderOption,
			ProviderProviderProviderOption,
			Provider,
			SystemStatus,
			SystemOption,
			SystemSystemOption,
			SystemSystemSystemOption,
			System,
			Folder,
			File,
			Setting,
		]),
		ReplicaModule,
		RedisModule,
		TransportModule,
		CacheModule,
	],
	providers: [ 
		ReplicaService,
		RedisService,
		LoopService,
		TransportService,
		CacheService,
		DownloadService,
	],
})
export class DownloadModule {
}
