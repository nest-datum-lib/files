const { exec } = require('child_process');
const https = require('https');
const http = require('http');
const fs = require('fs');
const util = require('util');

import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BalancerService } from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { QueueService } from 'nest-datum/queue/src';
import { envPropsBySubstr } from 'nest-datum/common/src';
import { generateAccessToken } from 'nest-datum/jwt/src';
import { SystemSystemSystemOption } from 'src/api/system-system-system-option/system-system-system-option.entity';
import { ProviderProviderProviderOption } from 'src/api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { Folder } from 'src/api/folder/folder.entity';
import { File } from 'src/api/file/file.entity';

@Injectable()
export class DownloadProcessor extends QueueService {
	constructor(
		@InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
		@InjectRepository(File) private readonly fileRepository: Repository<File>,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(ProviderProviderProviderOption) private readonly providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		@InjectRedis(process['REDIS_QUEUE']) public readonly queueRepository: Redis,
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
			if (!payloadData['name']
				|| typeof payloadData['name'] !== 'string') {
				throw new Error(`Payload "name (${(payloadData['name'] || '').toString()})" property is invalid format.`);
			}
			if (!payloadData['systemId']
				|| typeof payloadData['systemId'] !== 'string') {
				throw new Error(`Payload "systemId (${(payloadData['systemId'] || '').toString()})" property is invalid format.`);
			}
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
				return new Error(`File system "${payloadData['systemId']}" is undefined`);
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
				return new Error(`Provider "${systemOptionContent['system']['providerId']}" is undefined`);
			}
			const path = (((provider['content'] === '/')
				? ''
				: provider['content']) + systemOptionContent['content']) || '/';
			const parentFolder = await this.folderRepository.findOne({
				select: {
					id: true,
					path: true,
				},
				where: {
					path,
				},
			});

			const request = (payloadData['url'].indexOf('https://') === 0)
				? https
				: http;
			const fileName = uuidv4();
			const file = fs.createWriteStream(`${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`);

			await (new Promise((resolve, reject) => {
				const fetch = request.get(payloadData['url'], (response) => {
					if (response.statusCode !== 200
						&& response.statusCode !== 201) {
						return reject(new Error(`Request file "${payloadData['url'].toString()}" error`));
					}
					response.pipe(file);
				});

				fetch.on('error', (errRequest) => {
					fs.unlink(`${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`, (errUnlink) => {
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
					fs.unlink(`${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`, (errUnlink) => {
						if (errUnlink) {
							return reject(new Error(errUnlink.message));
						}
						return reject(new Error(errFile.message));
					});
				});
			}));
			const extension = await (new Promise((resolve, reject) => {
				exec(`node ${process.env.APP_FILE_UTILS_PATH}/src/format.js ${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`, async (error, stdout, stderr) => {
					if (error) {
						return reject(new Error(error.toString()));
					}
					if (stderr) {
						return reject(new Error(stderr.toString()));
					}
					if (stdout.indexOf('Error:') === 0) {
						return reject(new Error(stdout));
					}
					try {
						const extSplit = stdout.split(`ext: '`);
						const output = (extSplit[1].split(`', mime: '`))[0];
						
						return resolve(output);
					}
					catch (err) {
						console.log(`Extension error`, stdout);

						return reject(err);
					}
				});
			}));

			if (!extension
				|| typeof extension !== 'string') {
				new Error(`Extension error`);
			}
			if (extension !== 'pdf') {
				console.log('extension', extension);

				await (new Promise((resolve, reject) => {
					exec(`node ${process.env.APP_FILE_UTILS_PATH}/src/convert.js ${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`, async (error, stdout, stderr) => {
						if (error) {
							return reject(new Error(error.toString()));
						}
						if (stderr) {
							return reject(new Error(stderr.toString()));
						}
						if (stdout.indexOf('Error:') === 0) {
							return reject(new Error(stdout));
						}
						resolve(true);
					});
				}));
			}
			const stats = fs.statSync(`${process.env.APP_ROOT_PATH}${path}/${payloadData['name']}`);
			const fileData = await this.fileRepository.save({
				systemId: payloadData['systemId'],
				userId: '',
				parentId: parentFolder['id'],
				path: (parentFolder['path'] === '/')
					? `/${payloadData['name']}`
					: `${parentFolder['path']}/${payloadData['name']}`,
				name: payloadData['name'],
				type: 'pdf',
				size: stats.size,
			});
			const accessToken = generateAccessToken({
				id: 'sso-user-admin',
				roleId: 'sso-role-admin',
				email: process.env.USER_ROOT_EMAIL,
			}, Date.now());
			
			await this.balancerService.send({
				name: process.env.SERVICE_CV, 
				cmd: 'report.create',
			}, {
				accessToken,
				reportStatusId: 'cv-report-status-started',
				fileId: fileData['id'],
			});
		}
		catch (err) {
			console.error(err);

			throw new Error(err.message);
		}
	}
}
