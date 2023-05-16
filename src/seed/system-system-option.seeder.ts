import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SystemSystemOption } from '../api/system-system-option/system-system-option.entity';

export class SystemSystemOptionSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(SystemSystemOption) private readonly systemSystemOptionRepository: Repository<SystemSystemOption>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-system-system-option-views',
				systemOptionId: 'files-system-option-root',
				systemId: 'files-system-email-views',
			}, {
				id: 'files-system-system-option-cv',
				systemOptionId: 'files-system-option-root',
				systemId: 'files-system-cv',
			}, {
				id: 'files-system-system-option-avatars',
				systemOptionId: 'files-system-option-root',
				systemId: 'files-system-avatars',
			}, {
				id: 'files-system-system-option-default',
				systemOptionId: 'files-system-option-root',
				systemId: 'files-system-default',
			}, {
				id: 'files-system-system-option-cv-lensa',
				systemOptionId: 'files-system-option-root',
				systemId: 'files-system-cv-lensa',
			}], async (data) => {
				try {
					await this.systemSystemOptionRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: SystemSystemOption 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: SystemSystemOption 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}