import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { AccessOptionService as AccessOptionServiceBase } from '@nest-datum/access';
import { CacheService } from '@nest-datum/cache';
import { AccessAccessOption } from '../access-access-option/access-access-option.entity';
import { AccessOption } from './access-option.entity';

@Injectable()
export class AccessOptionService extends AccessOptionServiceBase {
	protected readonly repositoryConstructor = AccessOption;
	protected readonly repositoryOptionConstructor = AccessAccessOption;

	constructor(
		@InjectRepository(AccessOption) protected readonly repository: Repository<AccessOption>,
		@InjectRepository(AccessAccessOption) public readonly repositoryOption: Repository<AccessAccessOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
