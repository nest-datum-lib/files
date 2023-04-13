import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';

@Injectable()
export class SystemOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';
	protected readonly repositoryConstructor = SystemOption;
	protected readonly repositoryOptionConstructor = SystemSystemOption;

	constructor(
		@InjectRepository(SystemOption) protected readonly repository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) public readonly repositoryOption: Repository<SystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
