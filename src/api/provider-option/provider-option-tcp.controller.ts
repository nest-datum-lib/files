import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { OptionTcpController } from '@nest-datum/option';
import { ProviderOptionService } from './provider-option.service';

@Controller()
export class ProviderOptionTcpController extends OptionTcpController {
	constructor(
		protected service: ProviderOptionService,
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

	@EventPattern('provider.content')
	async content(payload) {
		return await super.content(payload);
	}
}
