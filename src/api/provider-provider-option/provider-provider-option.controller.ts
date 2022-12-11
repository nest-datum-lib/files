import getCurrentLine from 'get-current-line';
import { Controller } from '@nestjs/common';
import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { BalancerService } from 'nest-datum/balancer/src';
import * as Validators from 'nest-datum/validators/src';
import { ProviderProviderOptionService } from './provider-provider-option.service';

@Controller()
export class ProviderProviderOptionController {
	constructor(
		private readonly providerProviderOptionService: ProviderProviderOptionService,
		private readonly balancerService: BalancerService,
	) {
	}

	@MessagePattern({ cmd: 'providerOptionRelation.many' })
	async many(payload) {
		try {
			const many = await this.providerProviderOptionService.many({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_PROVIDER_OPTION_RELATION_MANY'] ],
					isRequired: true,
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

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@MessagePattern({ cmd: 'providerOptionRelation.one' })
	async one(payload) {
		try {
			const output = await this.providerProviderOptionService.one({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_PROVIDER_OPTION_RELATION_ONE'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('providerOptionRelation.drop')
	async drop(payload) {
		try {
			await this.providerProviderOptionService.drop({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_PROVIDER_OPTION_RELATION_DROP'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('providerOptionRelation.dropMany')
	async dropMany(payload) {
		try {
			await this.providerProviderOptionService.dropMany({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_PROVIDER_OPTION_RELATION_DROP_MANY'] ],
					isRequired: true,
				}),
				ids: Validators.arr('ids', payload['ids'], {
					isRequired: true,
					min: 1,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('providerOptionRelation.create')
	async create(payload) {
		try {
			const output = await this.providerProviderOptionService.create({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_PROVIDER_OPTION_RELATION_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				providerId: Validators.id('providerId', payload['providerId'], {
					isRequired: true,
				}),
				providerOptionId: Validators.id('providerOptionId', payload['providerOptionId'], {
					isRequired: true,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}
}
