import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Folder } from '../api/folder/folder.entity';

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
				id: 'files-folder-avatara',
				userId: process.env.USER_ID,
				systemId: "files-system-avatars",
				path: "/avatars",
				name: "avatars",
				description: "User avatars folder.",
				isNotDelete: 1,
				type: "folder",
				size: 0
			}, {
				id: 'files-folder-cv',
				userId: process.env.USER_ID,
				systemId: "files-system-cv",
				path: "/cv",
				name: "cv",
				description: "CV folder.",
				isNotDelete: 1,
				type: "folder",
				size: 0
			}, {
				id: 'files-folder-cv-lensa',
				userId: process.env.USER_ID,
				systemId: "files-system-cv-lensa",
				path: "/cv-lensa",
				name: "cv-lensa",
				description: "CV lensa folder.",
				isNotDelete: 1,
				type: "folder",
				size: 0
			}, {
				id: 'files-folder-email-views',
				userId: process.env.USER_ID,
				systemId: "files-system-email-views",
				path: "/email-views",
				name: "email-views",
				description: "Email views folder.",
				isNotDelete: 1,
				type: "folder",
				size: 0
			}, {
				id: 'files-folder-root',
				userId: process.env.USER_ID,
				systemId: "files-system-default",
				path: "/",
				name: "root",
				description: "Root folder.",
				isNotDelete: 1,
				type: "folder",
				size: 0
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