import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpTcpController } from '@nest-datum/option';

@Controller(`${process.env.SERVICE_FILES}/provider-option`)
export class ProviderOptionHttpTcpController extends OptionHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'providerOption';
	
	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
