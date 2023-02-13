import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusHttpController } from '@nest-datum/status';
import { SystemStatusService } from '../system-status.service';

@Controller(`system-status`)
export class SystemStatusController extends StatusHttpController {
	constructor(
		public transportService: TransportService,
		public entityService: SystemStatusService,
	) {
		super();
	}
}
