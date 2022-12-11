import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import getCurrentLine from 'get-current-line';
import { 
	Inject,
	Injectable, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from 'nest-datum/sql/src';
import { CacheService } from 'nest-datum/cache/src';
import { 
	ErrorException,
	NotFoundException, 
} from 'nest-datum/exceptions/src';
import { System } from './system.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';

@Injectable()
export class SystemService extends SqlService {
	constructor(
		@InjectRepository(System) private readonly systemRepository: Repository<System>,
		@InjectRepository(SystemSystemSystemOption) private readonly systemSystemSystemOptionRepository: Repository<SystemSystemSystemOption>,
		@InjectRepository(SystemSystemOption) private readonly systemSystemOptionRepository: Repository<SystemSystemOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		providerId: true,
		systemStatusId: true,
		name: true,
		description: true,
		isDeleted: true,
		isNotDelete: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'system', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'system', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'system', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'system', 'one', payload ], output);
			}
			if (!output) {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async drop({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'one', payload ]);

			await this.systemSystemSystemOptionRepository.delete({ systemId: payload['id'] });
			await this.systemSystemOptionRepository.delete({ systemId: payload['id'] });
			await this.dropByIsDeleted(this.systemRepository, payload['id']);

			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.systemSystemSystemOptionRepository.delete({ systemId: payload['ids'][i] });
				await this.systemSystemOptionRepository.delete({ systemId: payload['ids'][i] });
				await this.dropByIsDeleted(this.systemRepository, payload['ids'][i]);
				i++;
			}
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async dropOption({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'one' ]);
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'option', 'many' ]);

			await this.systemSystemSystemOptionRepository.delete({ systemSystemOptionId: payload['id'] });
			await this.systemSystemOptionRepository.delete({ id: payload['id'] });

			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'many' ]);

			const output = await this.systemRepository.save({
				...payload,
				userId: payload['userId'] || user['id'] || '',
			});

			await queryRunner.commitTransaction();

			return output;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async createOption({ 
		user, 
		id,
		optionId, 
		data, 
	}): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner();

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'one' ]);
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'option', 'many' ]);

			const systemSystemOption = await this.systemSystemOptionRepository.save({
				systemId: id,
				systemOptionId: optionId,
				...data,
			});
			
			const output = await this.one({
				user,
				id,
			});

			output['systemSystemOptions'] = [ systemSystemOption ];

			await queryRunner.commitTransaction();

			return output;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, optionId, data });
		}
		finally {
			await queryRunner.release();
		}
	}

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'system', 'many' ]);
			await this.cacheService.clear([ 'system', 'one' ]);
			
			await this.updateWithId(this.systemRepository, payload);
			
			await queryRunner.commitTransaction();
			
			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}
}
