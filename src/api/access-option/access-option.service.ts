import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { AccessOptionService as AccessOptionServiceBase } from '@nest-datum/access';
import { CacheService } from '@nest-datum/cache';
import { AccessAccessAccessOption } from '../access-access-access-option/access-access-access-option.entity';
import { AccessAccessOption } from '../access-access-option/access-access-option.entity';
import { AccessOption } from './access-option.entity';

@Injectable()
export class AccessOptionService extends AccessOptionServiceBase {
	constructor(
		@InjectRepository(AccessOption) protected readonly repository: Repository<AccessOption>,
		@InjectRepository(AccessAccessOption) protected readonly repositoryOption: Repository<AccessAccessOption>,
		@InjectRepository(AccessAccessAccessOption) public readonly contentManyService: Repository<AccessAccessAccessOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
