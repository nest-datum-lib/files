import { Controller } from '@nestjs/common';
import { RoleAccessHttpController as RoleAccessHttpControllerBase } from '@nest-datum/access';
import { TransportService } from '@nest-datum/transport';
import { RoleAccess } from './role-access.entity';

@Controller(`role/access`)
export class RoleAccessHttpController extends RoleAccessHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: RoleAccess,
	) {
		super();
	}
}
