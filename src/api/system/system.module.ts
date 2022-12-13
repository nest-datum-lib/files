import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { SystemSystemOptionService } from '../system-system-option/system-system-option.service';
import { FolderService } from '../folder/folder.service';
import { Provider } from '../provider/provider.entity';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';
import { SystemStatus } from '../system-status/system-status.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
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
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			System,
			Provider,
			Folder,
			File,
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FolderService,
		SystemSystemOptionService,
		SystemService, 
	],
})
export class SystemModule {
}

