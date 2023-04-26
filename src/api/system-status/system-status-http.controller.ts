import { Controller } from '@nestjs/common';
import { StatusHttpController } from '@nest-datum/status';
import { SystemStatusService } from './system-status.service';

@Controller(`/system-status`)
export class SystemStatusHttpController extends StatusHttpController {
	constructor(
		protected service: SystemStatusService,
	) {
		super();
	}
}
