import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpTcpController } from '@nest-datum/option';

@Controller(`${process.env.SERVICE_FILES}/system-option`)
export class SystemOptionHttpTcpController extends OptionHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'systemOption';
	
	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
