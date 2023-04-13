import { Controller } from '@nestjs/common';
import { StatusHttpController } from '@nest-datum/status';
import { SystemStatusService } from './system-status.service';

@Controller(`${process.env.SERVICE_FILES}/system-status`)
export class SystemStatusHttpController extends StatusHttpController {
	constructor(
		protected service: SystemStatusService,
	) {
		super();
	}
}
