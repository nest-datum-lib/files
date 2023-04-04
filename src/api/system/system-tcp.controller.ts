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
import { SystemService } from './system.service';

export class SystemTcpController extends TcpController {
	constructor(
		protected service: SystemService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
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
		if (utilsCheckExists(options['systemStatusId'])) {
			if (!utilsCheckStrId(options['systemStatusId'])) {
				throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
			}
			output['systemStatusId'] = options['systemStatusId'];
		}
		if (utilsCheckExists(options['providerId'])) {
			if (!utilsCheckStrId(options['providerId'])) {
				throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
			}
			output['providerId'] = options['providerId'];
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

	@MessagePattern({ cmd: 'system.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'system.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('system.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('system.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('system.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('system.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
