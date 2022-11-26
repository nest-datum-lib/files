import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { Provider } from '../provider/provider.entity';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { SystemStatus } from '../system-status/system-status.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from './system.entity';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';

@Module({
	controllers: [ SystemController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemStatus,
			SystemSystemSystemOption,
			SystemSystemOption,
			System,
			Provider,
			Folder,
			File,
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		SystemService, 
	],
})
export class SystemModule {
}

