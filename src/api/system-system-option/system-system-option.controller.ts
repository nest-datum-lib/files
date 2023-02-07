import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionTcpController as NestDatumOptionOptionTcpController } from '@nest-datum/option';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller()
export class SystemSystemOptionController extends NestDatumOptionOptionTcpController {
	public columnOptionId = 'systemId';
	public columnOptionOptionId = 'systemOptionId';

	constructor(
		public transportService: TransportService,
		public service: SystemSystemOptionService,
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
