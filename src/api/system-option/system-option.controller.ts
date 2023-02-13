import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionTcpController } from '@nest-datum/option';
import { SystemOptionService } from './system-option.service';

@Controller()
export class SystemOptionController extends OptionTcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: SystemOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'systemOption.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'systemOption.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('systemOption.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('systemOption.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('systemOption.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('systemOption.update')
	async update(payload) {
		return await super.update(payload);
	}

	@EventPattern('system.content')
	async content(payload) {
		return await super.content(payload);
	}
}
