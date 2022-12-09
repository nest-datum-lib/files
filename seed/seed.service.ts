import { Promise as Bluebird } from 'bluebird';
import { Connection } from 'typeorm';
import {
	Injectable,
	Logger,
} from '@nestjs/common';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderStatusSeeder } from './provider-status.seeder';
import { ProviderSeeder } from './provider.seeder';
import { SystemStatusSeeder } from './system-status.seeder';
import { SystemSeeder } from './system.seeder';
import { FolderSeeder } from './folder.seeder';
import { SettingSeeder } from './setting.seeder';

@Injectable()
export class SeedService {
	private readonly seeders = [];
	private readonly logger = new Logger(SeedService.name);

	constructor(
		private readonly cacheService: CacheService,
		private readonly connection: Connection,
		private readonly providerStatus: ProviderStatusSeeder,
		private readonly provider: ProviderSeeder,
		private readonly systemStatus: SystemStatusSeeder,
		private readonly system: SystemSeeder,
		private readonly folder: FolderSeeder,
		private readonly setting: SettingSeeder,
	) {
		this.seeders = [
			this.providerStatus,
			this.provider,
			this.systemStatus,
			this.system,
			this.folder,
			this.setting,
		];
	}

	async send() {
		try {
			await this.cacheService.clear([ 'provider', 'status', 'many' ]);
			await this.cacheService.clear([ 'provider', 'status', 'one' ]);
			await this.cacheService.clear([ 'system', 'status', 'many' ]);
			await this.cacheService.clear([ 'system', 'status', 'one' ]);
			await this.cacheService.clear([ 'provider', 'many' ]);
			await this.cacheService.clear([ 'provider', 'one' ]);
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'one' ]);
			await this.cacheService.clear([ 'folder', 'many' ]);
			await this.cacheService.clear([ 'folder', 'one' ]);
			await this.cacheService.clear([ 'setting', 'many' ]);
			await this.cacheService.clear([ 'setting', 'one' ]);

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
