import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { TcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
} from '@nest-datum-utils/check';
import { ProviderService } from './provider.service';

export class ProviderTcpController extends TcpController {
	constructor(
		protected service: ProviderService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerStatusId'])) {
			throw new MethodNotAllowedException(`Property "providerStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {
			description: '',
		};

		if (utilsCheckExists(options['userId'])) {
			if (!utilsCheckStrId(options['userId'])) {
				throw new MethodNotAllowedException(`Property "userId" is not valid.`);
			}
			output['userId'] = options['userId'];
		}
		if (utilsCheckExists(options['providerStatusId'])) {
			if (!utilsCheckStrId(options['providerStatusId'])) {
				throw new MethodNotAllowedException(`Property "providerStatusId" is not valid.`);
			}
			output['providerStatusId'] = options['providerStatusId'];
		}
		if (utilsCheckExists(options['name'])) {
			if (!utilsCheckStrName(options['name'])) {
				throw new MethodNotAllowedException(`Property "name" is not valid.`);
			}
			output['name'] = options['name'];
		}
		if (utilsCheckExists(options['description'])) {
			if (!utilsCheckStrDescription(options['description'])) {
				throw new MethodNotAllowedException(`Property "description" is not valid.`);
			}
			output['description'] = options['description'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
		};
	}

	@MessagePattern({ cmd: 'provider.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'provider.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('provider.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('provider.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('provider.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('provider.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
