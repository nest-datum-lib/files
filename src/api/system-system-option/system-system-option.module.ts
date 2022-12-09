import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			SystemSystemSystemOption,
			SystemOption,
			System, 
		]),
	],
})
export class SystemSystemOptionModule {
}

