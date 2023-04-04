import { Controller } from '@nestjs/common';
import { StatusHttpTcpController } from '@nest-datum/status';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FILES}/system-status`)
export class SystemStatusHttpTcpController extends StatusHttpTcpController {
	protected serviceName = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'systemStatus';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
