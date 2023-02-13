import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
} from '@nest-datum-utils/check';
import { ProviderService } from './provider.service';

@Controller()
export class ProviderController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: ProviderService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerStatusId'])) {
			throw new WarningException(`Property "providerStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['providerStatusId'] && utilsCheckStrId(options['providerStatusId'])) 
				? { providerStatusId: options['providerStatusId'] } 
				: {},
		};
	}

	@MessagePattern({ cmd: 'provider.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'provider.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('provider.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('provider.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('provider.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('provider.update')
	async update(payload) {
		return await super.update(payload);
	}
}
