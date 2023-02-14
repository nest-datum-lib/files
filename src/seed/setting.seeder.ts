import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { Setting } from '../api/setting/setting.entity';
import {
	USER_DEFAULT_ID,
	SETTING_APP_ID,
	DATA_TYPE_TEXT_ID,
} from './consts';

export class SettingSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(Setting) private readonly settingRepository: Repository<Setting>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: SETTING_APP_ID,
				userId: USER_DEFAULT_ID,
				name: 'App id',
				description: 'App id.',
				dataTypeId: DATA_TYPE_TEXT_ID,
				value: process.env.APP_ID,
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.settingRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: setting 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: setting 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}