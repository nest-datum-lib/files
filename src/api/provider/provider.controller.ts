import getCurrentLine from 'get-current-line';
import * as Validators from '@nest-datum/validators';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { 
	RegistryService,
	LogsService, 
} from '@nest-datum/services';
import { ProviderService } from './provider.service';

@Controller()
export class ProviderController {
	constructor(
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
		private readonly providerService: ProviderService,
	) {
	}

	@MessagePattern({ cmd: 'provider.many' })
	async many(payload) {
		try {
			const many = await this.providerService.many({
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

	@MessagePattern({ cmd: 'provider.one' })
	async one(payload) {
		try {
			const output = await this.providerService.one({
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

	@MessagePattern({ cmd: 'provider.drop' })
	async drop(payload) {
		try {
			await this.providerService.drop({
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

	@MessagePattern({ cmd: 'provider.dropMany' })
	async dropMany(payload) {
		try {
			await this.providerService.dropMany({
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
			this.registryService.clearResources();

			return err;
		}
	}

	@MessagePattern({ cmd: 'provider.dropOption' })
	async dropOption(payload) {
		try {
			await this.providerService.dropOption({
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

	@MessagePattern({ cmd: 'provider.create' })
	async create(payload) {
		try {
			const output = await this.providerService.create({
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
				providerStatusId: Validators.id('providerStatusId', payload['providerStatusId'], {
					isRequired: true,
				}),
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

	@MessagePattern({ cmd: 'provider.createOption' })
	async createOption(payload) {
		try {
			const output = await this.providerService.createOption({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', payload['id']),
				optionId: Validators.id('optionId', payload['optionId'], {
					isRequired: true,
				}),
				data: Validators.arr('data', payload['data']) || {},
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

	@MessagePattern({ cmd: 'provider.createOptions' })
	async createOptions(payload) {
		try {
			const output = await this.providerService.createOptions({
				user: Validators.token('accessToken', payload['accessToken'], {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', payload['id']),
				data: Validators.arr('data', payload['data'], {
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

	@MessagePattern({ cmd: 'provider.update' })
	async update(payload) {
		try {
			await this.providerService.update({
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
				providerStatusId: Validators.id('providerStatusId', payload['providerStatusId']),
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
