import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionHttpController as NestDatumOptionOptionHttpController } from '@nest-datum/option';
import { ProviderProviderOptionService } from '../provider-provider-option.service';

@Controller(`${process.env.SERVICE_FILES}/provider/option`)
export class ProviderProviderOptionController extends NestDatumOptionOptionHttpController {
	public columnOptionId = 'providerId';
	public columnOptionOptionId = 'providerOptionId';

	constructor(
		public transportService: TransportService,
		public service: ProviderProviderOptionService,
	) {
		super();
	}
}
