import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { HttpController as NestDatumHttpController } from '@nest-datum-common/controller';
import { ProviderOptionService } from '../provider-option.service';

@Controller(`${process.env.SERVICE_FILES}/provider-option`)
export class ProviderOptionController extends NestDatumHttpController {
	public serviceName = process.env.SERVICE_FILES;
	public entityName = 'providerOption';

	constructor(
		public transportService: TransportService,
		public service: ProviderOptionService,
	) {
		super();
	}
}
