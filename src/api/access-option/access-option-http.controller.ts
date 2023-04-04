import { Controller } from '@nestjs/common';
import { AccessOptionHttpController as AccessOptionHttpControllerBase } from '@nest-datum/access';
import { TransportService } from '@nest-datum/transport';
import { AccessOptionService } from './access-option.service';

@Controller(`access-option`)
export class AccessOptionHttpController extends AccessOptionHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: AccessOptionService,
	) {
		super();
	}
}
