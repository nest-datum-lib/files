import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { SystemOption } from '../api/system-option/system-option.entity';
import {
	SYSTEM_OPTION_ROOT_ID,
	DATA_TYPE_TEXT,
	USER_DEFAULT_ID,
} from './consts';

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
				id: SYSTEM_OPTION_ROOT_ID,
				userId: USER_DEFAULT_ID,
				name: 'Root path',
				description: 'Path to system folder.',
				dataTypeId: DATA_TYPE_TEXT,
				defaultValue: '/',
				isRequired: true,
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.systemOptionRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: systemOption 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: systemOption 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}