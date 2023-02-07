import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusHttpController as NestDatumStatusHttpController } from '@nest-datum/status';
import { SystemStatusService } from '../system-status.service';

@Controller(`${process.env.SERVICE_FILES}/system-status`)
export class SystemStatusController extends NestDatumStatusHttpController {
	constructor(
		public transportService: TransportService,
		public service: SystemStatusService,
	) {
		super();
	}
}
