import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { StatusTcpController } from '@nest-datum/status';
import { ProviderStatusService } from './provider-status.service';

@Controller()
export class ProviderStatusTcpController extends StatusTcpController {
	constructor(
		protected service: ProviderStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'providerStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'providerStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('providerStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('providerStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('providerStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('providerStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
