require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { 
	onExit,
	onWarning,
	onUncaughtException, 
} from '@nest-datum-common/process';
import { 
	QueueModule,
	QueueService, 
} from '@nest-datum/queue';
import { DownloadTask } from './download.task';

process.on('exit', onExit);
process.on('warning', onWarning);
process.on('uncaughtException', onUncaughtException);

async function bootstrap() {
	try {
		const queue = await NestFactory.create(QueueModule);
		const queueService = queue.get(QueueService);

		queueService
			.setTask(DownloadTask)
			.start();
	}
	catch (err) {
		console.error('ERROR:', err.message);
	}
};

bootstrap();
