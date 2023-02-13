import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from './system-system-option.entity';

@Injectable()
export class SystemSystemOptionService extends OptionOptionService {
	protected entityName = 'systemSystemOption';
	protected entityConstructor = SystemSystemOption;
	protected entityOptionId = 'systemOptionId';
	protected entityId = 'systemId';
	protected entityOptionName = 'systemOption';

	constructor(
		@InjectRepository(SystemSystemOption) protected entityRepository: Repository<SystemSystemOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
