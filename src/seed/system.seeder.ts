import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { System } from '../api/system/system.entity';
import {
	USER_DEFAULT_ID,
	PROVIDER_LOCAL_ID,
	SYSTEM_STATUS_ACTIVE_ID,
	SYSTEM_DEFAULT_ID,
	SYSTEM_AVATARS_ID,
	SYSTEM_CV_LENSA_ID,
	SYSTEM_CV_ID,
	SYSTEM_EMAIL_VIEWS_ID,
	SYSTEM_PAGE_VIEWS_ID,
} from './consts';

export class SystemSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(System) private readonly systemRepository: Repository<System>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: SYSTEM_DEFAULT_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'Default',
				description: 'Default filesystem.',
				isNotDelete: true,
			}, {
				id: SYSTEM_AVATARS_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'Avatars',
				description: 'User avatars.',
				isNotDelete: true,
			}, {
				id: SYSTEM_CV_LENSA_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'CV lensa',
				description: 'CV files from lensa API.',
				isNotDelete: true,
			}, {
				id: SYSTEM_CV_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'CV',
				description: 'CV files.',
				isNotDelete: true,
			}, {
				id: SYSTEM_EMAIL_VIEWS_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'Email views',
				description: 'Email views.',
				isNotDelete: true,
			}, {
				id: SYSTEM_PAGE_VIEWS_ID,
				userId: USER_DEFAULT_ID,
				systemStatusId: SYSTEM_STATUS_ACTIVE_ID,
				providerId: PROVIDER_LOCAL_ID,
				name: 'Page views',
				description: 'Page views.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.systemRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: System 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: System 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}