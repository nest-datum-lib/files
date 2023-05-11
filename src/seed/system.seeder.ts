import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { System } from '../api/system/system.entity';

export class SystemSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(System) private readonly systemRepository: Repository<System>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: 'files-system-avatars',
				providerId: 'files-provider-service-local',
				userId: process.env.USER_ID,
                systemStatusId: 'files-system-status-active',
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_AVATARS',
				name: 'Avatars',
				description: 'User avatars.',
				isNotDelete: 1,
			}, {
				id: 'files-system-cv',
				providerId: 'files-provider-service-local',
				userId: process.env.USER_ID,
                systemStatusId: 'files-system-status-active',
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_CV',
				name: 'CV',
				description: 'CV files.',
				isNotDelete: 1,
			}, {
				id: 'files-system-cv-lensa',
				providerId: 'files-provider-service-local',
				userId: process.env.USER_ID,
                systemStatusId: 'files-system-status-active',
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_CV_LENSA',
				name: 'CV lensa',
				description: 'CV files from lensa API.',
				isNotDelete: 1,
			}, {
				id: 'files-system-default',
				providerId: 'files-provider-service-local',
				userId: process.env.USER_ID,
                systemStatusId: 'files-system-status-active',
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_DEFAULT',
				name: 'Default',
				description: 'Default filesystem.',
				isNotDelete: 1,
			}, {
				id: 'files-system-email-views',
				providerId: 'files-provider-service-local',
				userId: process.env.USER_ID,
                systemStatusId: 'files-system-status-active',
				envKey: 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_EMAIL_VIEWS',
				name: 'Email views',
				description: 'Email views.',
				isNotDelete: 1,
			}], async (data) => {
				try {
					await this.systemRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: System 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: System 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}