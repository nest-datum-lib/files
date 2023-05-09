import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SystemStatus } from '../api/system-status/system-status.entity';

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
				id: 'files-system-status-active',
				userId: process.env.USER_ID,
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSTATUSSERVICE_ACTIVE',
				name: 'Active',
				description: 'System is active',
				isNotDelete: 1,
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