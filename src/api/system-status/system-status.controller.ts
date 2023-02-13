import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusTcpController } from '@nest-datum/status';
import { SystemStatusService } from './system-status.service';

@Controller()
export class SystemStatusController extends StatusTcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: SystemStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'systemStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'systemStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('systemStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('systemStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('systemStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('systemStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
