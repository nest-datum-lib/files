import { Controller } from '@nestjs/common';
import { AccessAccessOptionHttpController as AccessAccessOptionHttpControllerBase } from '@nest-datum/access';
import { TransportService } from '@nest-datum/transport';
import { AccessAccessOptionService } from './access-access-option.service';

@Controller(`access/option`)
export class AccessAccessOptionHttpController extends AccessAccessOptionHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: AccessAccessOptionService,
	) {
		super();
	}
}
