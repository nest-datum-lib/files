import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	RegistryService,
	LogsService,
	CacheService,
} from '@nest-datum/services';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';
import { SystemOptionService } from './system-option.service';
import { SystemOptionController } from './system-option.controller';

@Module({
	controllers: [ SystemOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			SystemSystemSystemOption, 
		]),
	],
	providers: [
		RegistryService, 
		LogsService,
		CacheService,
		SystemOptionService, 
	],
})
export class SystemOptionModule {
}


