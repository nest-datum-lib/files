import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { ProviderStatus } from 'src/api/provider-status/provider-status.entity';

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
				name: 'Active',
				description: 'Stystem provider is active',
				userId: 'sso-user-admin',
			}], async (data) => {
				try {
					await this.providerStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: provider-status 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: provider-status 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}