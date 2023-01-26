require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { 
	onExit,
	onWarning,
	onUncaughtException, 
} from 'nest-datum/common/src';
import { ProcessorModule } from './processor.module';
import { ProcessorService } from './processor.service';

process.on('exit', onExit);
process.on('warning', onWarning);
process.on('uncaughtException', onUncaughtException);

async function bootstrap() {
	process['USER_ROOT_EMAIL'] = process.env.USER_ROOT_EMAIL;
	process['USER_ROOT_LOGIN'] = process.env.USER_ROOT_LOGIN;
	process['USER_ROOT_PASSWORD'] = process.env.USER_ROOT_PASSWORD;
	process['PROJECT_ID'] = process.env.PROJECT_ID;
	process['APP_ID'] = process.env.APP_ID;
	process['JWT_SECRET_ACCESS_KEY'] = process.env.JWT_SECRET_ACCESS_KEY;
	process['JWT_SECRET_REFRESH_KEY'] = process.env.JWT_SECRET_REFRESH_KEY;
	
	const processor = await NestFactory.create(ProcessorModule);
	const processorService = processor.get(ProcessorService);

	await processorService.listen();
};

bootstrap();
