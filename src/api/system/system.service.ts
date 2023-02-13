import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionEntityService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from './system.entity';

@Injectable()
export class SystemService extends OptionEntityService {
	protected entityName = 'system';
	protected entityConstructor = System;
	protected entityOptionConstructor = SystemSystemOption;
	protected entityId = 'systemId';

	constructor(
		@InjectRepository(System) protected entityRepository: Repository<System>,
		@InjectRepository(SystemSystemOption) protected entityOptionRepository: Repository<SystemSystemOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			systemStatusId: true,
			providerId: true,
			name: true,
			description: true,
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
			providerId: true,
		});
	}
}
