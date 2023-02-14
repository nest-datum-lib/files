import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	redis,
	sql, 
} from '@nest-datum-common/config';
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
import { Setting } from '../api/setting/setting.entity';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';
import { SystemStatus } from '../api/system-status/system-status.entity';
import { Provider } from '../api/provider/provider.entity';
import { System } from '../api/system/system.entity';
import { Folder } from '../api/folder/folder.entity';
import { ProviderOption } from '../api/provider-option/provider-option.entity';
import { ProviderProviderProviderOption } from '../api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../api/provider-provider-option/provider-provider-option.entity';
import { SystemOption } from '../api/system-option/system-option.entity';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';
import { File } from '../api/file/file.entity';
import { SeedService } from './seed.service';
import { SettingSeeder } from './setting.seeder';
import { ProviderStatusSeeder } from './provider-status.seeder';
import { SystemStatusSeeder } from './system-status.seeder';
import { SystemOptionSeeder } from './system-option.seeder';
import { SystemSystemOptionSeeder } from './system-system-option.seeder';
import { SystemSystemSystemOptionSeeder } from './system-system-system-option.seeder';
import { ProviderSeeder } from './provider.seeder';
import { SystemSeeder } from './system.seeder';
import { FolderSeeder } from './folder.seeder';
import { FileSeeder } from './file.seeder';

@Module({
	controllers: [],
	imports: [
		RedisModule.forRoot(redis),
		TypeOrmModule.forRoot(sql),
		TypeOrmModule.forFeature([
			Setting,
			ProviderStatus,
			SystemStatus,
			Provider,
			System,
			Folder,
			ProviderOption,
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			File,
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SeedService,
		SettingSeeder,
		ProviderStatusSeeder,
		SystemStatusSeeder,
		ProviderSeeder,
		SystemOptionSeeder,
		SystemSeeder,
		SystemSystemOptionSeeder,
		SystemSystemSystemOptionSeeder,
		FolderSeeder,
		FileSeeder,
	]
})

export class SeedModule {
}
