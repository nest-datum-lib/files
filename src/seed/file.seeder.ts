import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../api/file/file.entity';
import {
	FILE_VIEW_RECOVERY_ID,
	FILE_VIEW_REGISTRATION_ID,
	FOLDER_CV_EMAIL_VIEWS_ID,
	USER_DEFAULT_ID,
	SYSTEM_DEFAULT_ID,
} from './consts';

export class FileSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: FILE_VIEW_RECOVERY_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_CV_EMAIL_VIEWS_ID,
				path: `/email-views/recovery.ejs`,
				name: 'recovery.ejs',
				description: 'Recovery view.',
				type: 'ejs',
				size: 500,
				isNotDelete: true,
			}, {
				id: FILE_VIEW_REGISTRATION_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_CV_EMAIL_VIEWS_ID,
				path: `/email-views/registry.ejs`,
				name: 'registry.ejs',
				description: 'Recovery view.',
				type: 'ejs',
				size: 500,
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.fileRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: File 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: File 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}