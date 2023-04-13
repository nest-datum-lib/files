import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from './system-system-option.entity';


export class SystemSystemOptionService extends BindService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';
	protected readonly repositoryConstructor = SystemSystemOption;
	
	constructor(
		@InjectRepository(SystemSystemOption) protected repository: Repository<SystemSystemOption>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
