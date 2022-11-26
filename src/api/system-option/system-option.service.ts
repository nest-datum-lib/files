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
import { 
	MysqlService,
	RegistryService,
	LogsService,
	CacheService, 
} from '@nest-datum/services';
import { ErrorException } from '@nest-datum/exceptions';
import { SystemOption } from './system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';

@Injectable()
export class SystemOptionService extends MysqlService {
	constructor(
		@InjectRepository(SystemOption) private readonly systemOptionRepository: Repository<SystemOption>,
		@InjectRepository(SystemSystemOption) private readonly systemSystemOptionRepository: Repository<SystemSystemOption>,
		private readonly connection: Connection,
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
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

	async many(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.systemOption.many`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemOptionRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set(`${process.env.APP_ID}.systemOption.many`, payload, output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		return [ [], 0 ];
	}

	async one(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.systemOption.one`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.systemOptionRepository.findOne(await this.findOne(payload));

			await this.cacheService.set(`${process.env.APP_ID}.systemOption.one`, payload, output);

			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
	}

	async drop(payload): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.one`, payload);

			await this.systemSystemOptionRepository.delete({ systemOptionId: payload['id'] });
			await this.dropByIsDeleted(this.systemOptionRepository, payload['id']);

			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		finally {
			await queryRunner.release();
		}
	}

	async dropMany(payload): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.one`, payload);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.systemSystemOptionRepository.delete({ systemOptionId: payload['ids'][i] });
				await this.dropByIsDeleted(this.systemOptionRepository, payload['ids'][i]);
				i++;
			}
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
		finally {
			await queryRunner.release();
		}
	}

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.many`);

			const output = await this.systemOptionRepository.save({
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
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.systemOption.one`);
			
			await this.updateWithId(this.systemOptionRepository, payload);
			
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
