import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
} from '@nest-datum-utils/check';
import { SystemService } from './system.service';

@Controller()
export class SystemTcpController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: SystemService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new WarningException(`Property "providerId" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new WarningException(`Property "systemStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['providerId'] && utilsCheckStrId(options['providerId'])) 
				? { providerId: options['providerId'] } 
				: {},
			...(options['systemStatusId'] && utilsCheckStrId(options['systemStatusId'])) 
				? { systemStatusId: options['systemStatusId'] } 
				: {},
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
	async update(payload) {
		return await super.update(payload);
	}
}
