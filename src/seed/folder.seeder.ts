import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { Folder } from '../api/folder/folder.entity';
import {
	FOLDER_ROOT_ID,
	FOLDER_CV_ID,
	FOLDER_CV_LENSA_ID,
	FOLDER_CV_PAGE_VIEWS_ID,
	FOLDER_CV_EMAIL_VIEWS_ID,
	FOLDER_CV_AVATARS_ID,
	USER_DEFAULT_ID,
	SYSTEM_DEFAULT_ID,
} from './consts';

export class FolderSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: FOLDER_ROOT_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				path: '/',
				name: 'root',
				description: 'Root folder.',
				isNotDelete: true,
			}, {
				id: FOLDER_CV_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_ROOT_ID,
				path: `/cv`,
				name: 'cv',
				description: 'CV storage.',
				isNotDelete: true,
			}, {
				id: FOLDER_CV_LENSA_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_ROOT_ID,
				path: `/cv-lensa`,
				name: 'cv-lensa',
				description: 'Storage CV from Lensa API.',
				isNotDelete: true,
			}, {
				id: FOLDER_CV_PAGE_VIEWS_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_ROOT_ID,
				path: `/page-views`,
				name: 'page-views',
				description: 'Page views storage.',
				isNotDelete: true,
			}, {
				id: FOLDER_CV_EMAIL_VIEWS_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_ROOT_ID,
				path: `/email-views`,
				name: 'email-views',
				description: 'Email views storage.',
				isNotDelete: true,
			}, {
				id: FOLDER_CV_AVATARS_ID,
				userId: USER_DEFAULT_ID,
				systemId: SYSTEM_DEFAULT_ID,
				parentId: FOLDER_ROOT_ID,
				path: `/avatars`,
				name: 'avatars',
				description: 'User avatars storage.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.folderRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: Folder 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: Folder 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}