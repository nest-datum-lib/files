import { Controller } from '@nestjs/common';
import { BindHttpTcpController } from '@nest-datum/bind';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FILES}/system/option`)
export class SystemSystemOptionHttpTcpController extends BindHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'systemOptionRelation';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
