import { Promise as Bluebird } from 'bluebird';
import { Connection } from 'typeorm';
import {
	Injectable,
	Logger,
} from '@nestjs/common';
import { CacheService } from '@nest-datum/cache';
import { SettingSeeder } from './setting.seeder';
import { ProviderStatusSeeder } from './provider-status.seeder';
import { SystemStatusSeeder } from './system-status.seeder';
import { ProviderSeeder } from './provider.seeder';
import { SystemOptionSeeder } from './system-option.seeder';
import { SystemSystemOptionSeeder } from './system-system-option.seeder';
import { SystemSystemSystemOptionSeeder } from './system-system-system-option.seeder';
import { SystemSeeder } from './system.seeder';
import { FolderSeeder } from './folder.seeder';
import { FileSeeder } from './file.seeder';

@Injectable()
export class SeedService {
	private readonly seeders = [];
	private readonly logger = new Logger(SeedService.name);

	constructor(
		private readonly cacheService: CacheService,
		private readonly connection: Connection,
		private readonly settings: SettingSeeder,
		private readonly providerStatus: ProviderStatusSeeder,
		private readonly systemStatus: SystemStatusSeeder,
		private readonly provider: ProviderSeeder,
		private readonly systemOption: SystemOptionSeeder,
		private readonly system: SystemSeeder,
		private readonly systemSystemOption: SystemSystemOptionSeeder,
		private readonly systemSystemSystemOption: SystemSystemSystemOptionSeeder,
		private readonly folder: FolderSeeder,
		private readonly file: FileSeeder,
	) {
		this.seeders = [
			this.settings,
			this.providerStatus,
			this.systemStatus,
			this.provider,
			this.systemOption,
			this.system,
			this.systemSystemOption,
			this.systemSystemSystemOption,
			this.folder,
			this.file,
		];
	}

	async send() {
		try {
			await this.cacheService.clear([ 'setting', 'many' ]);
			await this.cacheService.clear([ 'setting', 'one' ]);
			await this.cacheService.clear([ 'providerStatus', 'many' ]);
			await this.cacheService.clear([ 'providerStatus', 'one' ]);
			await this.cacheService.clear([ 'systemStatus', 'many' ]);
			await this.cacheService.clear([ 'systemStatus', 'one' ]);
			await this.cacheService.clear([ 'provider', 'many' ]);
			await this.cacheService.clear([ 'provider', 'one' ]);
			await this.cacheService.clear([ 'systemOption', 'many' ]);
			await this.cacheService.clear([ 'systemOption', 'one' ]);
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'one' ]);
			await this.cacheService.clear([ 'folder', 'many' ]);
			await this.cacheService.clear([ 'folder', 'one' ]);
			await this.cacheService.clear([ 'file', 'many' ]);
			await this.cacheService.clear([ 'file', 'one' ]);

			await Bluebird.each(this.seeders, async (seeder) => {
				this.logger.log(`Seeding ${seeder.constructor.name}`);
				
				await seeder.send();
			});
		}
		catch (err) {
			console.error(`ERROR send: ${err.message}`);
		}
	}
}
