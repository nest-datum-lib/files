import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { File } from '../api/file/file.entity';
import { v4 as uuidv4 } from 'uuid';

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
				id: uuidv4(),
				userId: process.env.USER_ID,
				systemId: "files-system-email-views",
				parentId: "files-folder-email-views",
				path: "/email-views/recovery.ejs",
				name: "recovery.ejs",
				description: "",
				type: "ejs",
				size: "428",
				isNotDelete: 1,
			}, {
				id: uuidv4(),
				userId: process.env.USER_ID,
				systemId: "files-system-email-views",
				parentId: "files-folder-email-views",
				path: "/email-views/registry.ejs",
				name: "registry.ejs",
				description: "",
				type: "ejs",
				size: "300",
				isNotDelete: 1,
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