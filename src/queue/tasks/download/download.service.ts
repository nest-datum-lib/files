const fs = require('fs');

import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { ReplicaService } from '@nest-datum/replica';
import { QueueTaskService } from '@nest-datum/task';
import { CacheService } from '@nest-datum/cache';
import { LoopService } from '@nest-datum/queue';
import {
	strUrl as utilsCheckStrUrl,
	strId as utilsCheckStrId,
	strFilled as utilsCheckStrFilled,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { 
	download as utilsFilesDownload,
	extension as utilsFilesExtension, 
	converTo as utilsFilesConverTo,
} from '@nest-datum-utils/files';
import { SystemSystemSystemOption } from '../../../api/system-system-system-option/system-system-system-option.entity';
import { Folder } from '../../../api/folder/folder.entity';
import { File } from '../../../api/file/file.entity';

@Injectable()
export class DownloadService extends QueueTaskService {
	protected delay = 800;

	constructor(
		@InjectRedis(process['REDIS_QUEUE']) protected redisService: Redis,
		@InjectRepository(SystemSystemSystemOption) protected systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(Folder) protected folderRepository: Repository<Folder>,
		protected replicaService: ReplicaService,
		protected loopService: LoopService,
		protected connection: Connection,
		protected cacheService: CacheService,
		protected queueTaskService: QueueTaskService,
	) {
		super(redisService, replicaService, loopService);
	}

	async onError(err, timestamp: Date, data: any): Promise<any> {
		console.log('DownloadService err', err);
	}

	async onErrorItem(err, timestamp: Date, data: object): Promise<any> {
		this.queueTaskService.start({
			name: 'LensaReportSaveService',
			payload: {
				reportId: data['lensaReportId'],
				reportStatusId: 'lensa-report-status-failure',
			},
		});
	}

	async onNextItem(err, data: object): Promise<any> {
		this.queueTaskService.start({
			name: 'LensaReportSaveService',
			payload: {
				reportId: data['lensaReportId'],
				reportStatusId: 'lensa-report-status-success',
				fileId: data['fileId'],
			},
		});
	}

	async validateInput(data) {
		if (!utilsCheckObj(data)) {
			throw new Error(`Output of task process function is not valid.`);
		}
		if (!utilsCheckStrId(data['systemId'])) {
			throw new Error(`Property systemId "${data['systemId']}" is not valid.`);
		}
		let srcData = data['src'];

		if (utilsCheckObj(data['PREV_OUTPUT'])
			&& utilsCheckObj(data['PREV_OUTPUT']['data'])
			&& utilsCheckArr(data['PREV_OUTPUT']['data']['src'])
			&& !srcData) {
			srcData = data['PREV_OUTPUT']['data']['src'];
		}
		if (!utilsCheckArr(srcData) && !utilsCheckStrUrl(srcData)) {
			throw new Error(`Property src "${srcData}" is not valid.`);
		}
		return data;
	}

	async process(timestamp: Date, data: any): Promise<any> {
		console.log('***************************************')
		console.log('DownloadService process: start');

		const srcData = utilsCheckArr(data['src'])
			? data['src']
			: [ data['src'] ];
		let i = 0,
			output = [];
		const systemOptionContentPath = await this.getSystemPath(data['systemId']);
		const parentFolder = await this.getParentFolder(systemOptionContentPath);
		const path = (systemOptionContentPath[0] === '/')
			? systemOptionContentPath.slice(1)
			: systemOptionContentPath;
		const queryRunner = await this.connection.createQueryRunner();

		try {
			await queryRunner.startTransaction();

			while (i < srcData.length) {
				const destinationPath = await utilsFilesDownload(srcData[i]['url'], `${process.env.PATH_ROOT}/${path}/${srcData[i]['name']}`, true);
				let extension;
				
				try {
					extension = await utilsFilesExtension(destinationPath);
				}
				catch (err) {
					console.log(err.message, `/${path}/${srcData[i]['name']}`);

					await this.onErrorItem(err, new Date(), srcData[i]);
					i++;
					continue;
				}	
				if (utilsCheckStrFilled(data['convertTo'])) {				
					if (!utilsCheckStrFilled(extension)) {
						console.log(`Extension error for file "/${path}/${srcData[i]['name']}".`);
						await this.onErrorItem(err, new Date(), srcData[i]);
						i++;
						continue;
					}
					if (extension !== data['convertTo']) {
						try {
							extension = await utilsFilesConverTo(destinationPath, data['convertTo']);
						}
						catch (err) {
							console.log(`Convertor error. File: "/${path}/${srcData[i]['name']}".`);

							await (new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000)));
							await this.onErrorItem(err, new Date(), srcData[i]);
							i++;
							continue;
						}
					}
				}
				const stats = fs.statSync(destinationPath);
				const file = await queryRunner.manager.save(Object.assign(new File, {
					userId: process.env.USER_ID,
					systemId: data['systemId'],
					parentId: parentFolder['id'],
					path: `${path}/${srcData[i]['name']}`,
					name: srcData[i]['name'],
					description: srcData[i]['description'] || '',
					type: extension,
					size: stats.size,
				}));

				output.push({ 
					id: file['id'], 
					path: file['path'],
					name: file['name'],
					description: file['description'],
					type: file['type'],
					size: file['size'],
				});

				await this.onNextItem(new Date(), { ...srcData[i], fileId: file['id'] });
				await (new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000)));

				console.log(`DownloadService process: File "${srcData[i]['name']} downloaded successfully!"`);
				i++;
			}
			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);

			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			throw err;
		}
		finally {
			await queryRunner.release();
		}
		console.log('DownloadService process: Process completed successfully!');

		return {
			systemId: data['systemId'],
			parentId: parentFolder['id'],
			parentPath: parentFolder['path'],
			parentName: parentFolder['name'],
			files: output,
		};
	}

	async getParentFolder(path: string): Promise<any> {
		const parentFolder = await this.folderRepository.findOne({
			select: {
				id: true,
				path: true,
			},
			where: {
				path,
			},
		});

		if (!parentFolder) {
			throw new Error(`Parent folder with path "${path}" is not defined.`);
		}
		console.log('DownloadService process: parentFolder model successfully got!');

		return parentFolder;
	}

	async getSystemPath(systemId: string): Promise<any> {
		const systemOptionContent = await this.systemSystemSystemOptionRepository.findOne({
			select: {
				id: true,
				systemId: true,
				systemSystemOptionId: true,
				content: true,
			},
			where:{
				systemId,
				systemSystemOption: {
					systemOption: {
						id: 'files-system-option-root',
					},
				},
			},
		});

		if (!systemOptionContent) {
			throw new Error(`System with id "${systemId}" is not defined or folder path is not configured.`);
		}
		console.log('DownloadService getSystemPath: systemOptionContent model successfully got!');

		return systemOptionContent['content'];
	}
}
