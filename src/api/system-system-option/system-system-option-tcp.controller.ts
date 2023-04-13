import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BindTcpController } from '@nest-datum/bind';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller()
export class SystemSystemOptionTcpController extends BindTcpController {
	constructor(
		protected service: SystemSystemOptionService,
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
