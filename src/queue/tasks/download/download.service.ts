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
	) {
		super(redisService, replicaService, loopService);
	}

	async validateInput(data) {
		console.log('DownloadService validateInput 1');

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
		console.log('DownloadService validateInput 2');

		return data;
	}

	async process(timestamp: Date, data: any): Promise<any> {
		const srcData = utilsCheckArr(data['src'])
			? data['src']
			: [ data['src'] ];
		let i = 0,
			output = [];
		const systemOptionContentPath = await this.systemSystemSystemOptionRepository.findOne({
			select: {
				id: true,
				systemId: true,
				systemSystemOptionId: true,
				content: true,
			},
			where:{
				systemId: data['systemId'],
				systemSystemOption: {
					systemOption: {
						id: 'files-system-option-root',
					},
				},
			},
		});

		console.log('DownloadService process systemOptionContentPath', systemOptionContentPath);

		if (!systemOptionContentPath) {
			throw new Error(`System with id "${data['systemId']}" is not defined or folder path is not configured.`);
		}
		const parentFolder = await this.folderRepository.findOne({
			select: {
				id: true,
				path: true,
			},
			where: {
				path: systemOptionContentPath['content'],
			},
		});

		console.log('DownloadService process parentFolder', parentFolder);

		if (!parentFolder) {
			throw new Error(`Parent folder with path "${systemOptionContentPath['content']}" is not defined.`);
		}
		const path = (systemOptionContentPath['content'][0] === '/')
			? systemOptionContentPath['content'].slice(1)
			: systemOptionContentPath['content'];
		const queryRunner = await this.connection.createQueryRunner();

		console.log('DownloadService process path', path);

		try {
			await queryRunner.startTransaction();

			console.log('DownloadService process srcData', srcData.length);

			while (i < srcData.length) {
				const destinationPath = await utilsFilesDownload(srcData[i]['url'], `${process.env.PATH_ROOT}/${path}/${srcData[i]['name']}`, true);
				let extension;
				console.log('*******************************')
				console.log('destinationPath', destinationPath);
				console.log('*******************************')

				try {
					extension = await utilsFilesExtension(destinationPath);
				}
				catch (err) {
					console.log(err.message, `/${path}/${srcData[i]['name']}`);
					i++;
					continue;
				}	
				if (utilsCheckStrFilled(data['convertTo'])) {				
					if (!utilsCheckStrFilled(extension)) {
						console.log(`Extension error for file "/${path}/${srcData[i]['name']}".`);
						i++;
						continue;
					}
					if (extension !== data['convertTo']) {
						extension = await utilsFilesConverTo(destinationPath, data['convertTo']);
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

			console.log('DownloadService process await queryRunner.rollbackTransaction()', err);

			throw err;
		}
		finally {
			await queryRunner.release();
		}
		console.log('DownloadService process output', output.length);

		return {
			systemId: data['systemId'],
			parentId: parentFolder['id'],
			parentPath: parentFolder['path'],
			parentName: parentFolder['name'],
			files: output,
		};
	}
}
