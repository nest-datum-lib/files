import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Folder } from 'src/api/folder/folder.entity';

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
				id: 'files-folder-root',
				userId: 'sso-user-admin',
				systemId: 'files-system-default',
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

					console.error(`ERROR: folder 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: folder 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}