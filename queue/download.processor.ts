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

@Injectable()
export class DownloadProcessor extends QueueService {
	constructor(
		// @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
		@InjectRedis(process['REDIS_QUEUE']) public readonly queueRepository: Redis,
		public readonly resumeParserProcessor: ResumeParserProcessor,
		private readonly balancerService: BalancerService,
		private readonly cacheService: CacheService,
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
			const request = (url.indexOf('https://') === 0)
				? https
				: http;

			console.log('payloadData', payloadData);

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
