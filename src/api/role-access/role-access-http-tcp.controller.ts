import { Controller } from '@nestjs/common';
import { RoleAccessHttpTcpController as RoleAccessHttpTcpControllerBase } from '@nest-datum/access';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FILES}/role/access`)
export class RoleAccessHttpTcpController extends RoleAccessHttpTcpControllerBase {
	protected serviceName = process.env.SERVICE_FILES;

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
