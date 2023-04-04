import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionHttpController } from '@nest-datum/option';
import { ProviderProviderOptionService } from './provider-provider-option.service';

@Controller(`provider/option`)
export class ProviderProviderOptionHttpController extends OptionOptionHttpController {
	protected entityId = 'providerId';
	protected entityOptionId = 'providerOptionId';

	constructor(
		protected transportService: TransportService,
		protected entityService: ProviderProviderOptionService,
	) {
		super();
	}
}
