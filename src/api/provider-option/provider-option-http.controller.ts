import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpController } from '@nest-datum/option';
import { ProviderOptionService } from './provider-option.service';

@Controller(`provider-option`)
export class ProviderOptionHttpController extends OptionHttpController {
	protected serviceName = process.env.SERVICE_FILES;
	protected entityName = 'providerOption';

	constructor(
		protected transportService: TransportService,
		protected entityService: ProviderOptionService,
	) {
		super();
	}
}
