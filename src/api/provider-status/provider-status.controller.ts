import getCurrentLine from 'get-current-line';
import * as Validators from '@nest-datum/validators';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { 
	RegistryService,
	LogsService, 
} from '@nest-datum/services';
import { ProviderStatusService } from './provider-status.service';

@Controller()
export class ProviderStatusController {
	constructor(
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
		private readonly providerStatusService: ProviderStatusService,
	) {
	}

	@MessagePattern({ cmd: 'providerStatus.many' })
	async many(payload) {
		try {
			const many = await this.providerStatusService.many({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				sort: Validators.obj('sort', payload['sort']),
				filter: Validators.obj('filter', payload['filter']),
				query: Validators.str('query', payload['query'], {
					min: 1,
					max: 255,
				}),
				page: Validators.int('page', payload['page'], {
					min: 1,
					default: 1,
				}),
				limit: Validators.int('limit', payload['limit'], {
					min: 1,
					default: 20,
				}),
			});

			await this.registryService.clearResources();

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.logsService.emit(err);
			this.registryService.clearResources();

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerStatus.one' })
	async one(payload) {
		try {
			const output = await this.providerStatusService.one({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});

			await this.registryService.clearResources();

			return output;
		}
		catch (err) {
			this.logsService.emit(err);
			this.registryService.clearResources();

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerStatus.drop' })
	async drop(payload) {
		try {
			await this.providerStatusService.drop({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});
			await this.registryService.clearResources();

			return true;
		}
		catch (err) {
			this.logsService.emit(err);
			this.registryService.clearResources();

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerStatus.dropMany' })
	async dropMany(payload) {
		try {
			await this.providerStatusService.dropMany({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				ids: Validators.arr('ids', payload['ids'], {
					isRequired: true,
					min: 1,
				}),
			});
			await this.registryService.clearResources();

			return true;
		}
		catch (err) {
			this.logsService.emit(err);

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerStatus.create' })
	async create(payload) {
		try {
			const output = await this.providerStatusService.create({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', payload['id']),
				userId: Validators.id('userId', payload['userId']),
				name: Validators.str('name', payload['name'], {
					isRequired: true,
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', payload['description'], {
					min: 1,
					max: 255,
				}),
				isNotDelete: Validators.bool('isNotDelete', payload['isNotDelete']),
			});

			await this.registryService.clearResources();

			return output;
		}
		catch (err) {
			this.logsService.emit(err);
			this.registryService.clearResources();

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerStatus.update' })
	async update(payload) {
		try {
			await this.providerStatusService.update({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', payload['id']),
				newId: Validators.id('newId', payload['newId']),
				userId: Validators.id('userId', payload['userId']),
				name: Validators.str('name', payload['name'], {
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', payload['description'], {
					min: 1,
					max: 255,
				}),
				isNotDelete: Validators.bool('isNotDelete', payload['isNotDelete']),
				isDeleted: Validators.bool('isDeleted', payload['isDeleted']),
				createdAt: Validators.date('createdAt', payload['createdAt']),
			});
			await this.registryService.clearResources();

			return true;
		}
		catch (err) {
			this.logsService.emit(err);
			this.registryService.clearResources();

			return err;
		}
	}
}
