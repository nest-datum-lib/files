import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlConfig as utilsFormatSqlConfig } from '@nest-datum-utils/format';

import { SeedService } from './seed.service';
import { FileSeeder } from './file.seeder';
import { AccessStatusSeeder } from './access-status.seeder';
import { FolderSeeder } from './folder.seeder';
import { ProviderStatusSeeder } from './provider-status.seeder';
import { ProviderSeeder } from './provider.seeder';
import { SystemOptionSeeder } from './system-option.seeder';
import { SystemStatusSeeder } from './system-status.seeder';
import { SystemSystemOptionSeeder } from './system-system-option.seeder';
import { SystemSystemSystemOptionSeeder } from './system-system-system-option.seeder';
import { SystemSeeder } from './system.seeder';

import { AccessStatus } from '../api/access-status/access-status.entity';
import { Folder } from '../api/folder/folder.entity';
import { File } from '../api/file/file.entity';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';
import { Provider } from '../api/provider/provider.entity';
import { ProviderProviderOption } from '../api/provider-provider-option/provider-provider-option.entity';
import { ProviderProviderProviderOption } from '../api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../api/provider-option/provider-option.entity';
import { SystemOption } from '../api/system-option/system-option.entity';
import { SystemStatus } from '../api/system-status/system-status.entity';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import { System } from '../api/system/system.entity';

@Module({
	controllers: [],
	imports: [
		TypeOrmModule.forRoot(utilsFormatSqlConfig()),
		TypeOrmModule.forFeature([
			AccessStatus,
			ProviderOption,
			ProviderProviderProviderOption,
			ProviderProviderOption,
			ProviderStatus,
			Provider,
			SystemOption,
			SystemStatus,
			System,
			SystemSystemOption,
			SystemSystemSystemOption,
			Folder,
			File,
		]),
	],
	providers: [
		AccessStatusSeeder,
		ProviderStatusSeeder,
		ProviderSeeder,
		SystemOptionSeeder,
		SystemStatusSeeder,
		SystemSeeder,
		SystemSystemOptionSeeder,
		SystemSystemSystemOptionSeeder,
		SeedService,
		FolderSeeder,
		FileSeeder,
	]
})

export class SeedModule {
}
