import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { File } from '../file/file.entity';
import { System } from '../system/system.entity';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';

@Module({
	controllers: [ FolderController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Folder,
			File,
			System, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FolderService, 
	],
})
export class FolderModule {
}

