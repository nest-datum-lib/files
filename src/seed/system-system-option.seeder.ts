import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';
import {
	SYSTEM_OPTION_ROOT_ID,
	SYSTEM_DEFAULT_OPTION_ROOT_ID,
	SYSTEM_DEFAULT_ID,
	SYSTEM_AVATARS_OPTION_ROOT_ID,
	SYSTEM_AVATARS_ID,
	SYSTEM_CV_LENSA_OPTION_ROOT_ID,
	SYSTEM_CV_LENSA_ID,
	SYSTEM_CV_OPTION_ROOT_ID,
	SYSTEM_CV_ID,
	SYSTEM_EMAIL_VIEWS_OPTION_ROOT_ID,
	SYSTEM_EMAIL_VIEWS_ID,
	SYSTEM_PAGE_VIEWS_OPTION_ROOT_ID,
	SYSTEM_PAGE_VIEWS_ID,
} from './consts';

export class SystemSystemOptionSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(SystemSystemOption) private readonly systemSystemOptionRepository: Repository<SystemSystemOption>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: SYSTEM_DEFAULT_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_DEFAULT_ID,
			}, {
				id: SYSTEM_AVATARS_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_AVATARS_ID,
			}, {
				id: SYSTEM_CV_LENSA_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_CV_LENSA_ID,
			}, {
				id: SYSTEM_CV_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_CV_ID,
			}, {
				id: SYSTEM_EMAIL_VIEWS_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_EMAIL_VIEWS_ID,
			}, {
				id: SYSTEM_PAGE_VIEWS_OPTION_ROOT_ID,
				systemOptionId: SYSTEM_OPTION_ROOT_ID,
				systemId: SYSTEM_PAGE_VIEWS_ID,
			}], async (data) => {
				try {
					await this.systemSystemOptionRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: SystemSystemOption 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: SystemSystemOption 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}