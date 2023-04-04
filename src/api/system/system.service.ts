import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { MainService } from '@nest-datum/main';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from './system.entity';

@Injectable()
export class SystemService extends MainService {
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly enableTransactions: boolean = true;
	protected readonly repositoryConstructor = System;
	protected readonly repositoryBindOptionConstructor = SystemSystemOption;
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';

	constructor(
		@InjectRepository(System) protected readonly repository: Repository<System>,
		@InjectRepository(SystemSystemOption) protected repositoryBindOption: Repository<SystemSystemOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
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
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			name: true,
			description: true,
		});
	}
}
