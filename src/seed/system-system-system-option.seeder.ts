import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import {
	SYSTEM_DEFAULT_OPTION_OPTION_ROOT_ID,
	SYSTEM_AVATARS_OPTION_OPTION_ROOT_ID,
	SYSTEM_CV_LENSA_OPTION_OPTION_ROOT_ID,
	SYSTEM_CV_OPTION_OPTION_ROOT_ID,
	SYSTEM_EMAIL_VIEWS_OPTION_OPTION_ROOT_ID,
	SYSTEM_PAGE_VIEWS_OPTION_OPTION_ROOT_ID,
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

export class SystemSystemSystemOptionSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: SYSTEM_DEFAULT_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_DEFAULT_OPTION_ROOT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				content: '/',
			}, {
				id: SYSTEM_AVATARS_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_AVATARS_OPTION_ROOT_ID,
				systemId: SYSTEM_AVATARS_ID,
				content: '/avatars',
			}, {
				id: SYSTEM_CV_LENSA_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_CV_LENSA_OPTION_ROOT_ID,
				systemId: SYSTEM_CV_LENSA_ID,
				content: '/cv-lensa',
			}, {
				id: SYSTEM_CV_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_CV_OPTION_ROOT_ID,
				systemId: SYSTEM_CV_ID,
				content: '/cv',
			}, {
				id: SYSTEM_EMAIL_VIEWS_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_EMAIL_VIEWS_OPTION_ROOT_ID,
				systemId: SYSTEM_EMAIL_VIEWS_ID,
				content: '/email-views',
			}, {
				id: SYSTEM_PAGE_VIEWS_OPTION_OPTION_ROOT_ID,
				systemSystemOptionId: SYSTEM_PAGE_VIEWS_OPTION_ROOT_ID,
				systemId: SYSTEM_PAGE_VIEWS_ID,
				content: '/page-views',
			}], async (data) => {
				try {
					await this.systemSystemSystemOptionRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: SystemSystemSystemOption 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: SystemSystemSystemOption 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}