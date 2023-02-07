import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionTcpController as NestDatumOptionTcpController } from '@nest-datum/option';
import { ProviderOptionService } from './provider-option.service';

@Controller()
export class ProviderOptionController extends NestDatumOptionTcpController {
	constructor(
		public transportService: TransportService,
		public service: ProviderOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'providerOption.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'providerOption.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('providerOption.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('providerOption.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('providerOption.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('providerOption.update')
	async update(payload) {
		return await super.update(payload);
	}
}
