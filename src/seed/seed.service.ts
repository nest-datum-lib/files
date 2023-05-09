import { Promise as Bluebird } from 'bluebird';
import { Connection } from 'typeorm';
import {
	Injectable,
	Logger,
} from '@nestjs/common';
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

@Injectable()
export class SeedService {
	private readonly seeders = [];
	private readonly logger = new Logger(SeedService.name);

	constructor(
		private readonly connection: Connection,
		private readonly accessStatus: AccessStatusSeeder,
		private readonly providerStatus: ProviderStatusSeeder,
		private readonly provider: ProviderSeeder,
		private readonly systemOption: SystemOptionSeeder,
		private readonly systemStatus: SystemStatusSeeder,
		private readonly system: SystemSeeder,
		private readonly systemSystemOption: SystemSystemOptionSeeder,
		private readonly systemSystemSystemOption: SystemSystemSystemOptionSeeder,
		private readonly folder: FolderSeeder,
		private readonly file: FileSeeder,
	) {
		this.seeders = [
			this.accessStatus,
			this.providerStatus,
			this.provider,
			this.systemOption,
			this.systemStatus,
			this.system,
			this.systemSystemOption,
			this.systemSystemSystemOption,
			this.folder,
			this.file,
		];
	}

	async send() {
		try {
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
