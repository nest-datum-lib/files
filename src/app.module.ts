import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
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
import { 
	redis,
	sql, 
} from '@nest-datum-common/config';
import { AppController } from './app.controller';
import { ProviderStatusModule } from './api/provider-status/provider-status.module';
import { ProviderOptionModule } from './api/provider-option/provider-option.module';
import { ProviderProviderOptionModule } from './api/provider-provider-option/provider-provider-option.module';
import { ProviderModule } from './api/provider/provider.module';
import { SystemStatusModule } from './api/system-status/system-status.module';
import { SystemOptionModule } from './api/system-option/system-option.module';
import { SystemSystemOptionModule } from './api/system-system-option/system-system-option.module';
import { SystemModule } from './api/system/system.module';
import { FolderModule } from './api/folder/folder.module';
import { FileModule } from './api/file/file.module';
import { SettingModule } from './api/setting/setting.module';
import { ProviderStatusModule as HttpProviderStatusModule } from './api/provider-status/http/provider-status.module';
import { ProviderOptionModule as HttpProviderOptionModule } from './api/provider-option/http/provider-option.module';
import { ProviderProviderOptionModule as HttpProviderProviderOptionModule } from './api/provider-provider-option/http/provider-provider-option.module';
import { ProviderModule as HttpProviderModule } from './api/provider/http/provider.module';
import { SystemStatusModule as HttpSystemStatusModule } from './api/system-status/http/system-status.module';
import { SystemOptionModule as HttpSystemOptionModule } from './api/system-option/http/system-option.module';
import { SystemSystemOptionModule as HttpSystemSystemOptionModule } from './api/system-system-option/http/system-system-option.module';
import { SystemModule as HttpSystemModule } from './api/system/http/system.module';
import { FolderModule as HttpFolderModule } from './api/folder/http/folder.module';
import { FileModule as HttpFileModule } from './api/file/http/file.module';
import { SettingModule as HttpSettingModule } from './api/setting/http/setting.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(sql),
		RedisModule.forRoot(redis),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
		SettingModule,
		ProviderStatusModule,
		ProviderOptionModule,
		ProviderProviderOptionModule,
		ProviderModule,
		SystemStatusModule,
		SystemOptionModule,
		SystemSystemOptionModule,
		SystemModule,
		FolderModule,
		FileModule,

		//http
		HttpSettingModule,
		HttpProviderStatusModule,
		HttpProviderOptionModule,
		HttpProviderProviderOptionModule,
		HttpProviderModule,
		HttpSystemStatusModule,
		HttpSystemOptionModule,
		HttpSystemSystemOptionModule,
		HttpSystemModule,
		HttpFolderModule,
		HttpFileModule,
	],
	controllers: [ AppController ],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
	],
})
export class AppModule {
}
