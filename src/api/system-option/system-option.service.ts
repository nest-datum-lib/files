import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from './system-option.entity';

@Injectable()
export class SystemOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';
	protected readonly optionContentColumnName: string = 'systemSystemOptionId';
	protected readonly repositoryConstructor = SystemOption;
	protected readonly repositoryOptionConstructor = SystemSystemOption;
	protected readonly repositoryContentOptionConstructor = SystemSystemSystemOption;

	constructor(
		@InjectRepository(SystemOption) protected readonly repository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) public readonly repositoryOption: Repository<SystemSystemOption>,
		@InjectRepository(SystemSystemSystemOption) public readonly repositoryContentOption: Repository<SystemSystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
