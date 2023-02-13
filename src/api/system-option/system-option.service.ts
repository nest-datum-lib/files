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

@Injectable()
export class SystemOptionService extends OptionService {
	protected entityName = 'systemOption';
	protected entityServicedName = 'system';
	protected entityId = 'systemId';
	protected entityOptionId = 'systemOptionId';
	protected entityOptionRelationId = 'systemSystemOptionId';
	protected entityConstructor = SystemOption;
	protected entityOptionConstructor = SystemSystemOption;
	protected entityOptionRelationConstructor = SystemSystemSystemOption;

	constructor(
		@InjectRepository(SystemOption) protected entityRepository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) protected entityOptionRepository: Repository<SystemSystemOption>,
		@InjectRepository(SystemSystemSystemOption) protected entityOptionRelationRepository: Repository<SystemSystemSystemOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
