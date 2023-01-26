const https = require('https');
const http = require('http');
const fs = require('fs');

import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BalancerService } from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { QueueService } from 'nest-datum/queue/src';
import { envPropsBySubstr } from 'nest-datum/common/src';
import { SystemSystemSystemOption } from 'src/api/system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from 'src/api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from 'src/api/folder/folder.entity';
import { File } from 'src/api/file/file.entity';

@Injectable()
export class DownloadProcessor extends QueueService {
	constructor(
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) private readonly providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		@InjectRedis(process['REDIS_QUEUE']) public readonly queueRepository: Redis,
		private readonly balancerService: BalancerService,
		private readonly cacheService: CacheService,
		// private readonly fileService: FileService,
	) {
		super(queueRepository);
	}

	async callback(payload: object, currentTime): Promise<any> {
		const payloadData = payload['data'];

		try {
			if (!payloadData
				|| typeof payloadData !== 'object'
				|| Array.isArray(payloadData)) {
				throw new Error(`Payload "data (${(payloadData || '').toString()})" is invalid format.`);
			}
			if (!payloadData['url']
				|| typeof payloadData['url'] !== 'string') {
				throw new Error(`Payload "url (${(payloadData['url'] || '').toString()})" property is invalid format.`);
			}
			if (!payloadData['systemId']
				|| typeof payloadData['systemId'] !== 'string') {
				throw new Error(`Payload "systemId (${(payloadData['systemId'] || '').toString()})" property is invalid format.`);
			}
			const request = (payloadData['url'].indexOf('https://') === 0)
				? https
				: http;
			const fileName = uuidv4();
			// const file = fs.createWriteStream(`${process.env.APP_ROOT_PATH}/${id}.pdf`);

			this.cacheService.clear([ 'folder', 'one' ]);
			this.cacheService.clear([ 'folder', 'many' ]);
			this.cacheService.clear([ 'file', 'many' ]);
			this.cacheService.clear([ 'file', 'one' ]);

			const systemOptionContent = await this.systemSystemSystemOptionRepository.findOne({
				select: {
					id: true,
					systemId: true,
					content: true,
				},
				where:{
					systemId: payloadData['systemId'],
					systemSystemOption: {
						systemOption: {
							id: 'files-system-option-root',
						},
					},
				},
				relations: {
					system: true,
				},
			});

			if (!systemOptionContent
				|| !systemOptionContent['system']) {
				return new NotFoundException('File system is undefined', getCurrentLine(), { user, ...payload });
			}
			const provider = await this.providerProviderProviderOptionRepository.findOne({
				select: {
					id: true,
					providerId: true,
					content: true,
				},
				where:{
					providerId: systemOptionContent['system']['providerId'],
					providerProviderOption: {
						providerOption: {
							id: 'files-provider-option-root-path',
						},
					},
				},
			});

			if (!provider) {
				return new NotFoundException('Provider is undefined', getCurrentLine(), { user, ...payload });
			}
			const path = ((provider['content'] === '/')
				? ''
				: provider['content']) + systemOptionContent['content'];

			console.log('payloadData', path);

			/*await (new Promise((resolve, reject) => {
				const fetch = request.get(payloadData['url'], (response) => {
					if (response.statusCode !== 200
						&& response.statusCode !== 201) {
						return reject(new Error(`Request file "${payloadData['url'].toString()}" error`));
					}
					response.pipe(file);
				});

				fetch.on('error', (errRequest) => {
					fs.unlink(`${process.env.APP_ROOT_PATH}/${id}.pdf`, (errUnlink) => {
						if (errUnlink) {
							return reject(new Error(errUnlink.message));
						}
						return reject(new Error(errRequest.message));
					});
				});

				file.on('finish', () => {
					file.close();

					return resolve(true);
				});

				file.on('error', (errFile) => {
					fs.unlink(`${process.env.APP_ROOT_PATH}/${id}.pdf`, (errUnlink) => {
						if (errUnlink) {
							return reject(new Error(errUnlink.message));
						}
						return reject(new Error(errFile.message));
					});
				});
			}));*/
		}
		catch (err) {
			console.error(err);

			throw new Error(err.message);
		}
	}
}
