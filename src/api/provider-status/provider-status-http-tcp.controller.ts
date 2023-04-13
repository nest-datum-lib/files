import { Controller } from '@nestjs/common';
import { StatusHttpTcpController } from '@nest-datum/status';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FILES}/provider-status`)
export class ProviderStatusHttpTcpController extends StatusHttpTcpController {
	protected serviceName = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'providerStatus';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
