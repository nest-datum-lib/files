import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SystemStatus } from 'src/api/system-status/system-status.entity';

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
				name: 'Active',
				description: 'Stystem system is active',
				userId: 'sso-user-admin',
			}], async (data) => {
				try {
					await this.systemStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: system-status 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: system-status 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}