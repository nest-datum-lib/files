import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpOptionController as NestDatumTcpOptionController } from '@nest-datum-common/controller';
import { 
	bool as utilsCheckBool,
	exists as utilsCheckExists,
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	strEmail as utilsCheckStrEmail,
	strPassword as utilsCheckStrPassword,
	strDescription as utilsCheckStrDescription,
	strRegex as utilsCheckStrRegex,
	strDate as utilsCheckStrDate,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';
import { SystemService } from './system.service';

@Controller()
export class SystemController extends NestDatumTcpOptionController {
	constructor(
		public transportService: TransportService,
		public service: SystemService,
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

	@EventPattern('system.createOptions')
	async createOptions(payload) {
		return await super.createOptions(payload);
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
