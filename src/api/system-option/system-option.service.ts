import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService as NestDatumOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { SystemOption } from './system-option.entity';

@Injectable()
export class SystemOptionService extends NestDatumOptionService {
	public entityName = 'systemOption';
	public entityColumnOption = 'systemOptionId';
	public entityConstructor = SystemOption;

	constructor(
		@InjectRepository(SystemOption) public repository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) public repositoryOptionOption: Repository<SystemSystemOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, repositoryOptionOption, connection, cacheService);
	}
}
