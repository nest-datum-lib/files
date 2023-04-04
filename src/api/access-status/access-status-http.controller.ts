import { Controller } from '@nestjs/common';
import { AccessStatusHttpController as AccessStatusHttpControllerBase } from '@nest-datum/access';
import { TransportService } from '@nest-datum/transport';
import { AccessStatusService } from './access-status.service';

@Controller(`access-status`)
export class AccessStatusHttpController extends AccessStatusHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: AccessStatusService,
	) {
		super();
	}
}
