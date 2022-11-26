import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ SystemSystemOption ]),
		TypeOrmModule.forFeature([ System ]),
	],
})
export class SystemSystemSystemOptionModule {
}

