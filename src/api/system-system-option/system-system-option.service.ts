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
import { SystemSystemOption } from './system-system-option.entity';

@Injectable()
export class SystemSystemOptionService extends SqlService {
	constructor(
		@InjectRepository(SystemSystemOption) private readonly systemSystemOptionRepository: Repository<SystemSystemOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		systemId: true,
		systemOptionId: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'system', 'option', 'relation', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemSystemOptionRepository.findAndCount(await this.findMany(payload));

			this.cacheService.set([ 'system', 'option', 'relation', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'system', 'option', 'relation', 'one' , payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemSystemOptionRepository.findOne(await this.findOne(payload));
		
			if (output) {
				this.cacheService.set([ 'system', 'option', 'relation', 'one', payload ], output);
			}
			else {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async drop({ user, id }): Promise<any> {
		try {
			this.cacheService.clear([ 'system', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'system', 'option', 'relation', 'one', id ]);
			this.cacheService.clear([ 'system', 'option', 'many' ]);
			this.cacheService.clear([ 'system', 'option', 'one' ]);
			this.cacheService.clear([ 'system', 'one' ]);

			await this.systemSystemOptionRepository.delete({ id });

			return true;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, id });
		}
	}

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'system', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'system', 'option', 'relation', 'one', payload ]);
			this.cacheService.clear([ 'system', 'option', 'many' ]);
			this.cacheService.clear([ 'system', 'many' ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.dropByIsDeleted(this.systemSystemOptionRepository, payload['ids'][i]);
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

	async create({ user, id, systemId, systemOptionId }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			this.cacheService.clear([ 'system', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'system', 'option', 'many' ]);
			this.cacheService.clear([ 'system', 'option', 'one' ]);
			this.cacheService.clear([ 'system', 'many' ]);
			this.cacheService.clear([ 'system', 'one' ]);

			const userId = (user
				&& typeof user === 'object')
				? (user['id'] || '')
				: '';
			const systemOptionRelation = await this.systemSystemOptionRepository.save({
				id: id || uuidv4(),
				userId,
				systemId,
				systemOptionId,
			});
			
			systemOptionRelation['userId'] = userId;

			await queryRunner.commitTransaction();

			return systemOptionRelation;
		}
		catch (err) {
			console.log('errr', err);

			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, systemId, systemOptionId });
		}
		finally {
			await queryRunner.release();
		}
	}
}
