import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';

export class ProviderStatusSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(ProviderStatus) private readonly providerStatusRepository: Repository<ProviderStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-provider-status-active',
				userId: process.env.USER_ID,
				envKey: 'SSO_USER_ADMIN_HAPP_PROVIDERSTATUSSERVICE_ACTIVE',
				name: 'Active',
				description: 'Provider is active.',
				isNotDelete: 1,
			}], async (data) => {
				try {
					await this.providerStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: ProviderStatus 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: ProviderStatus 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}