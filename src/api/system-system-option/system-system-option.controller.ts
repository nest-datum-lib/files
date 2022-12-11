import getCurrentLine from 'get-current-line';
import { Controller } from '@nestjs/common';
import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { BalancerService } from 'nest-datum/balancer/src';
import * as Validators from 'nest-datum/validators/src';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller()
export class SystemSystemOptionController {
	constructor(
		private readonly systemSystemOptionService: SystemSystemOptionService,
		private readonly balancerService: BalancerService,
	) {
	}

	@MessagePattern({ cmd: 'systemOptionRelation.many' })
	async many(payload) {
		try {
			const many = await this.systemSystemOptionService.many({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_MANY'] ],
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

	@MessagePattern({ cmd: 'systemOptionRelation.one' })
	async one(payload) {
		try {
			const output = await this.systemSystemOptionService.one({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_ONE'] ],
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

	@EventPattern('systemOptionRelation.drop')
	async drop(payload) {
		try {
			await this.systemSystemOptionService.drop({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_DROP'] ],
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

	@EventPattern('systemOptionRelation.dropMany')
	async dropMany(payload) {
		try {
			await this.systemSystemOptionService.dropMany({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_DROP_MANY'] ],
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

	@EventPattern('systemOptionRelation.create')
	async create(payload) {
		try {
			const output = await this.systemSystemOptionService.create({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				systemId: Validators.id('systemId', payload['systemId'], {
					isRequired: true,
				}),
				systemOptionId: Validators.id('systemOptionId', payload['systemOptionId'], {
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
