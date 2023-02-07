import { 
	Controller,
	Post,
	Body,
	Param,
} from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { OptionOptionHttpController as NestDatumOptionOptionHttpController } from '@nest-datum/option';
import { ProviderProviderOptionService } from '../provider-provider-option.service';

@Controller(`provider/option`)
export class ProviderProviderOptionController extends NestDatumOptionOptionHttpController {
	public columnOptionId = 'providerId';
	public columnOptionOptionId = 'providerOptionId';

	constructor(
		public transportService: TransportService,
		public service: ProviderProviderOptionService,
	) {
		super();
	}

	@Post(':id')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') providerOptionId: string,
		@Body('providerId') providerId: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			providerOptionId,
			providerId,
		})));
	}
}
