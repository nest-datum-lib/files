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
import { Provider } from './provider.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';

@Injectable()
export class ProviderService extends MysqlService {
	constructor(
		@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>,
		@InjectRepository(ProviderProviderProviderOption) private readonly providerProviderProviderOptionRepository: Repository<ProviderProviderProviderOption>,
		@InjectRepository(ProviderProviderOption) private readonly providerProviderOptionRepository: Repository<ProviderProviderOption>,
		private readonly connection: Connection,
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		providerStatusId: true,
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

	async many(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.provider.many`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.providerRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set(`${process.env.APP_ID}.provider.many`, payload, output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}

		return [ [], 0 ];
	}

	async one(payload): Promise<any> {
		try {
			const cachedData = await this.cacheService.get(`${process.env.APP_ID}.provider.one`, payload);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.providerRepository.findOne(await this.findOne(payload));
		
			await this.cacheService.set(`${process.env.APP_ID}.provider.one`, payload, output);

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
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.provider.one`, payload);

			await this.providerProviderProviderOptionRepository.delete({ providerId: payload['id'] });
			await this.providerProviderOptionRepository.delete({ providerId: payload['id'] });
			await this.dropByIsDeleted(this.providerRepository, payload['id']);

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
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.provider.one`, payload);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.providerProviderProviderOptionRepository.delete({ providerId: payload['ids'][i] });
				await this.providerProviderOptionRepository.delete({ providerId: payload['ids'][i] });
				await this.dropByIsDeleted(this.providerRepository, payload['ids'][i]);
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

	async dropOption(payload): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.provider.one`);
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.providerOption.many`);

			await this.providerProviderProviderOptionRepository.delete({ providerProviderOptionId: payload['id'] });
			await this.providerProviderOptionRepository.delete({ id: payload['id'] });

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
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);

			const output = await this.providerRepository.save({
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
			await this.cacheService.clear(`${process.env.APP_ID}.provider.one`);
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.providerOption.many`);

			const providerProviderOption = await this.providerProviderOptionRepository.save({
				providerId: id,
				providerOptionId: optionId,
				...data,
			});
			
			const output = await this.one({
				user,
				id,
			});

			output['providerProviderOptions'] = [ providerProviderOption ];

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

	async createOptions({ user, id, data }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner();

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);

			await this.providerProviderProviderOptionRepository.delete({
				providerId: id,
			});

			let i = 0,
				ii = 0;

			while (i < data.length) {
				ii = 0;

				const option = data[i];

				while (ii < option.length) {
					const {
						entityOptionId,
						entityId,
						id: itemId,
						...optionData
					} = option[ii];

					const output = await this.providerProviderProviderOptionRepository.save({
						...optionData,
						providerId: id,
						providerProviderOptionId: entityOptionId,
					});

					ii++;
				}
				i++;
			}
			await queryRunner.commitTransaction();
			
			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, data });
		}
		finally {
			await queryRunner.release();
		}
	}

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear(`${process.env.APP_ID}.provider.many`);
			await this.cacheService.clear(`${process.env.APP_ID}.provider.one`);
			
			await this.updateWithId(this.providerRepository, payload);
			
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
