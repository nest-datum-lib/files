import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisConfig } from 'config/redis';
import { typeormConfig } from 'config/typeorm';
import { BalancerModule } from 'nest-datum/balancer/src';
import { QueueModule } from 'nest-datum/queue/src';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderStatusModule } from 'src/api/provider-status/provider-status.module';
import { ProviderOptionModule } from 'src/api/provider-option/provider-option.module';
import { ProviderProviderOptionModule } from 'src/api/provider-provider-option/provider-provider-option.module';
import { ProviderProviderProviderOptionModule } from 'src/api/provider-provider-provider-option/provider-provider-provider-option.module';
import { ProviderModule } from 'src/api/provider/provider.module';
import { SystemStatusModule } from 'src/api/system-status/system-status.module';
import { SystemOptionModule } from 'src/api/system-option/system-option.module';
import { SystemSystemOptionModule } from 'src/api/system-system-option/system-system-option.module';
import { SystemSystemSystemOptionModule } from 'src/api/system-system-system-option/system-system-system-option.module';
import { SystemModule } from 'src/api/system/system.module';
import { FolderModule } from 'src/api/folder/folder.module';
import { FileModule } from 'src/api/file/file.module';
import { SettingModule } from 'src/api/setting/setting.module';
import { FolderService } from 'src/api/folder/folder.service';
import { FileService } from 'src/api/file/file.service';
import { ProcessorService } from './processor.service';
import { DownloadProcessor } from './download.processor';

@Module({
	controllers: [],
	imports: [
		ServeStaticModule.forRoot({ rootPath: process.env.APP_ROOT_PATH }),
		TypeOrmModule.forRoot(typeormConfig),
		RedisModule.forRoot(redisConfig),
		BalancerModule,
		SettingModule,
		ProviderStatusModule,
		ProviderOptionModule,
		ProviderProviderOptionModule,
		ProviderProviderProviderOptionModule,
		ProviderModule,
		SystemStatusModule,
		SystemOptionModule,
		SystemSystemOptionModule,
		SystemSystemSystemOptionModule,
		SystemModule,
		FolderModule,
		FileModule,
	],
	providers: [ 
		BalancerRepository,
		BalancerService, 
		CacheService,
		FileService,
		ProcessorService, 
		DownloadProcessor,
	],
})
export class ProcessorModule {
}
