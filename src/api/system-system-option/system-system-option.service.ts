import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService as NestDatumOptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from './system-system-option.entity';

@Injectable()
export class SystemSystemOptionService extends NestDatumOptionOptionService {
	public entityName = 'systemSystemOption';
	public entityConstructor = SystemSystemOption;

	constructor(
		@InjectRepository(SystemSystemOption) public repository: Repository<SystemSystemOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}

	protected selectDefaultMany = {
		id: true,
		systemId: true,
		systemOptionId: true,
		createdAt: true,
		updatedAt: true,
	};
}
