import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SystemOption } from '../api/system-option/system-option.entity';

export class SystemOptionSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(SystemOption) private readonly systemOptionRepository: Repository<SystemOption>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-system-option-root',
				userId: process.env.USER_ID,
				dataTypeId: "happ-data-type-text",
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMOPTIONSERVICE_ROOT_PATH',
				name: 'Root path',
				description: 'Path to system folder.',
				defaultValue: '/',
				isRequired: 1,
				isNotDelete: 1,
			}], async (data) => {
				try {
					await this.systemOptionRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: SystemOption 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: SystemOption 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}