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