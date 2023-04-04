import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';

export class SystemOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';

	constructor(
		@InjectRepository(SystemOption) protected readonly repository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) protected readonly repositoryOption: Repository<SystemSystemOption>,
		@InjectRepository(SystemSystemSystemOption) public readonly contentManyService: Repository<SystemSystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
