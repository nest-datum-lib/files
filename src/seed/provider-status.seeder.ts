import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { ProviderStatus } from '../api/provider-status/provider-status.entity';
import {
	PROVIDER_STATUS_ACTIVE_ID,
	USER_DEFAULT_ID,
} from './consts';

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
				id: PROVIDER_STATUS_ACTIVE_ID,
				userId: USER_DEFAULT_ID,
				name: 'Active',
				description: 'Provider is active.',
				isNotDelete: true,
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