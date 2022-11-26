import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { System } from 'src/api/system/system.entity';
import { SystemStatus } from 'src/api/system-status/system-status.entity';

export class SystemSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(System) private readonly systemRepository: Repository<System>,
		@InjectRepository(SystemStatus) private readonly systemStatusRepository: Repository<SystemStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-system-default',
				userId: 'sso-user-admin',
				systemStatusId: 'files-system-status-active',
				providerId: 'files-provider-local',
				name: 'Default',
				description: 'Default file system.',
				isNotDelete: true,
			}, {
				id: 'files-system-avatars',
				userId: 'sso-user-admin',
				systemStatusId: 'files-system-status-active',
				providerId: 'files-provider-local',
				name: 'Avatars',
				description: 'Storage for custom avatars.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.systemRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: provider 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: provider 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}