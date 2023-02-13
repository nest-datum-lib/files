import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { SystemStatus } from '../api/system-status/system-status.entity';
import {
	SYSTEM_STATUS_ACTIVE_ID,
	USER_DEFAULT_ID,
} from './consts';

export class SystemStatusSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(SystemStatus) private readonly systemStatusRepository: Repository<SystemStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: SYSTEM_STATUS_ACTIVE_ID,
				userId: USER_DEFAULT_ID,
				name: 'Active',
				description: 'System is active.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.systemStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: SystemStatus 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: SystemStatus 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}