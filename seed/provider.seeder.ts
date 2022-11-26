import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Provider } from 'src/api/provider/provider.entity';
import { ProviderStatus } from 'src/api/provider-status/provider-status.entity';

export class ProviderSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>,
		@InjectRepository(ProviderStatus) private readonly providerStatusRepository: Repository<ProviderStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-provider-local',
				userId: 'sso-user-admin',
				providerStatusId: 'files-provider-status-active',
				name: 'Local',
				description: 'Local system provider.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.providerRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: provider 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: provider 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}