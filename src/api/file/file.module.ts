import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Folder } from '../folder/folder.entity';
import { File } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
	controllers: [ FileController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Folder,
			File, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FileService, 
	],
})
export class FileModule {
}

