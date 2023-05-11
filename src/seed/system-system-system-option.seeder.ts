import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SystemSystemSystemOption } from '../api/system-system-system-option/system-system-system-option.entity';
import { v4 as uuidv4 } from 'uuid';

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
				id: uuidv4(),
				content: '/',
				systemSystemOptionId: 'files-system-system-option-default',
				systemId: 'files-system-default',
			}, {
				id: uuidv4(),
				content: '/cv-lensa',
				systemSystemOptionId: 'files-system-system-option-cv-lensa',
				systemId: 'files-system-cv-lensa',
			}, {
				id: uuidv4(),
				content: '/email-views',
				systemSystemOptionId: 'files-system-system-option-views',
				systemId: 'files-system-email-views',
			}, {
				id: uuidv4(),
				content: '/avatars',
				systemSystemOptionId: 'files-system-system-option-avatars',
				systemId: 'files-system-avatars',
			}, {
				id: uuidv4(),
				content: '/cv',
				systemSystemOptionId: 'files-system-system-option-cv',
				systemId: 'files-system-cv',
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