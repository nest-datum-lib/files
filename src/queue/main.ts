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
import { 
	DownloadModule,
	DownloadService, 
} from './tasks/download';

process.on('exit', onExit);
process.on('warning', onWarning);
process.on('uncaughtException', onUncaughtException);

async function bootstrap() {
	try {
		const queue = await NestFactory.create(QueueModule);
		const queueService = queue.get(QueueService);

		queueService
			.setTask(DownloadModule, DownloadService)
			.start();
	}
	catch (err) {
		console.error('ERROR:', err.message);
	}
};

bootstrap();
