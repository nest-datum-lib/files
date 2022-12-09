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
import { ProviderOption } from './provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';

@Injectable()
export class ProviderOptionService extends SqlService {
	constructor(
		@InjectRepository(ProviderOption) private readonly providerOptionRepository: Repository<ProviderOption>,
		@InjectRepository(ProviderProviderOption) private readonly providerProviderOptionRepository: Repository<ProviderProviderOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		name: true,
		description: true,
		dataTypeId: true,
		defaultValue: true,
		regex: true,
		isMultiline: true,
		isRequired: true,
		isDeleted: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
		defaultValue: true,
		regex: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'letter', 'option', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.providerOptionRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'letter', 'option', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'letter', 'option', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.providerOptionRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'letter', 'option', 'one', payload ], output);
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
			await this.cacheService.clear([ 'letter', 'option', 'many' ]);
			await this.cacheService.clear([ 'letter', 'option', 'one', payload ]);

			await this.providerProviderOptionRepository.delete({ providerOptionId: payload['id'] });
			await this.dropByIsDeleted(this.providerOptionRepository, payload['id']);

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
			await this.cacheService.clear([ 'letter', 'option', 'many' ]);
			await this.cacheService.clear([ 'letter', 'option', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.providerProviderOptionRepository.delete({ providerOptionId: payload['ids'][i] });
				await this.dropByIsDeleted(this.providerOptionRepository, payload['ids'][i]);
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

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'letter', 'option', 'many' ]);

			const output = await this.providerOptionRepository.save({
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

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'letter', 'option', 'many' ]);
			await this.cacheService.clear([ 'letter', 'option', 'one' ]);
			
			await this.updateWithId(this.providerOptionRepository, payload);
			
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
