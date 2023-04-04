import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionTcpController } from '@nest-datum/option';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller()
export class SystemSystemOptionTcpController extends OptionOptionTcpController {
	protected entityId = 'systemId';
	protected entityOptionId = 'systemOptionId';

	constructor(
		protected transportService: TransportService,
		protected entityService: SystemSystemOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'systemOptionRelation.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'systemOptionRelation.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('systemOptionRelation.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('systemOptionRelation.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('systemOptionRelation.create')
	async create(payload) {
		return await super.create(payload);
	}
}
