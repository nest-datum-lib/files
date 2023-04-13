import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { SystemSystemOptionService } from './system-system-option.service';
import { SystemSystemOptionHttpController } from './system-system-option-http.controller';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';
import { SystemSystemOption } from './system-system-option.entity';

@Module({
	controllers: [ SystemSystemOptionHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			SystemOption,
			SystemSystemOption,
			System,
			SystemSystemSystemOption, 
		]),
		CacheModule,
	],
	providers: [
		CacheService,
		SystemSystemOptionService, 
	],
})
export class SystemSystemOptionHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
