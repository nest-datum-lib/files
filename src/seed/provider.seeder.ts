import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { Provider } from '../api/provider/provider.entity';
import {
	PROVIDER_LOCAL_ID,
	PROVIDER_STATUS_ACTIVE_ID,
	USER_DEFAULT_ID,
} from './consts';

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
				id: PROVIDER_LOCAL_ID,
				userId: USER_DEFAULT_ID,
				providerStatusId: PROVIDER_STATUS_ACTIVE_ID,
				name: 'Local',
				description: 'Local storage.',
				isNotDelete: true,
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