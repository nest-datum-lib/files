import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { AccessHttpController as AccessHttpControllerBase } from '@nest-datum/access';
import { AccessService } from './access.service';

@Controller(`access`)
export class AccessHttpController extends AccessHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: AccessService,
	) {
		super();
	}
}
