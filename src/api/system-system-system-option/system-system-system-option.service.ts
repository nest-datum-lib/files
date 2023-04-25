import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { ManyService } from '@nest-datum/many';
import { SystemSystemSystemOption } from './system-system-system-option.entity';

@Injectable()
export class SystemSystemSystemOptionService extends ManyService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemSystemOptionId';
	protected readonly repositoryConstructor = SystemSystemSystemOption;

	constructor(
		@InjectRepository(SystemSystemSystemOption) protected readonly repository: Repository<SystemSystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
