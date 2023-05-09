import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Provider } from '../api/provider/provider.entity';

export class ProviderSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-provider-service-local',
				userId: process.env.USER_ID,
                providerStatusId: 'files-provider-status-active',
                name: 'Local',
                description: 'Local storage.',
				envKey: 'SSO_USER_ADMIN_HAPP_PROVIDERSERVICE_LOCAL',
				isNotDelete: 1,
			}], async (data) => {
				try {
					await this.providerRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: Provider 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: Provider 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}