import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpController as NestDatumOptionHttpController } from '@nest-datum/option';
import { ProviderOptionService } from '../provider-option.service';

@Controller(`provider-option`)
export class ProviderOptionController extends NestDatumOptionHttpController {
	public serviceName = process.env.SERVICE_FILES;
	public entityName = 'providerOption';

	constructor(
		public transportService: TransportService,
		public service: ProviderOptionService,
	) {
		super();
	}
}
