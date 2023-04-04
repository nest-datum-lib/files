import { Controller } from '@nestjs/common';
import { AccessHttpTcpController as AccessHttpTcpControllerBase } from '@nest-datum/access';
import { AccessService } from './access.service';

@Controller(`${process.env.SERVICE_FILES}/access`)
export class AccessHttpTcpController extends AccessHttpTcpControllerBase {
	constructor(
		protected service: AccessService,
	) {
		super();
	}
}
