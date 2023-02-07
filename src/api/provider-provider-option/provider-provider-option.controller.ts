import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionTcpController as NestDatumOptionOptionTcpController } from '@nest-datum/option';
import { ProviderProviderOptionService } from './provider-provider-option.service';

@Controller()
export class ProviderProviderOptionController extends NestDatumOptionOptionTcpController {
	public columnOptionId = 'providerId';
	public columnOptionOptionId = 'providerOptionId';

	constructor(
		public transportService: TransportService,
		public service: ProviderProviderOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'providerOptionRelation.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'providerOptionRelation.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('providerOptionRelation.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('providerOptionRelation.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('providerOptionRelation.create')
	async create(payload) {
		return await super.create(payload);
	}
}
