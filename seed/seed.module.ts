import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '@nest-datum/services';
import { typeormConfig } from 'config/typeorm';
import { redisConfig } from 'config/redis';
import { SeedService } from './seed.service';
import { ProviderStatus } from 'src/api/provider-status/provider-status.entity';
import { ProviderOption } from 'src/api/provider-option/provider-option.entity';
import { ProviderProviderOption } from 'src/api/provider-provider-option/provider-provider-option.entity';
import { ProviderProviderProviderOption } from 'src/api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { Provider } from 'src/api/provider/provider.entity';
import { SystemStatus } from 'src/api/system-status/system-status.entity';
import { SystemOption } from 'src/api/system-option/system-option.entity';
import { SystemSystemOption } from 'src/api/system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from 'src/api/system-system-system-option/system-system-system-option.entity';
import { System } from 'src/api/system/system.entity';
import { Folder } from 'src/api/folder/folder.entity';
import { File } from 'src/api/file/file.entity';
import { Setting } from 'src/api/setting/setting.entity';
import { ProviderStatusSeeder } from './provider-status.seeder';
import { ProviderSeeder } from './provider.seeder';
import { SystemStatusSeeder } from './system-status.seeder';
import { SystemSeeder } from './system.seeder';
import { FolderSeeder } from './folder.seeder';
import { SettingSeeder } from './setting.seeder';

@Module({
	controllers: [],
	imports: [
		TypeOrmModule.forRoot(typeormConfig),
		RedisModule.forRoot(redisConfig),
		TypeOrmModule.forFeature([
			Setting,
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
		]),
	],
	providers: [
		CacheService,
		SeedService,
		ProviderStatusSeeder,
		ProviderSeeder,
		SystemStatusSeeder,
		SystemSeeder,
		FolderSeeder,
		SettingSeeder,
	]
})

export class SeedModule {
}
