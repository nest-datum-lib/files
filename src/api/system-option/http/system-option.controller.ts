import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { HttpController as NestDatumHttpController } from '@nest-datum-common/controller';
import { SystemOptionService } from '../system-option.service';

@Controller(`${process.env.SERVICE_FILES}/system-option`)
export class SystemOptionController extends NestDatumHttpController {
	public serviceName = process.env.SERVICE_FILES;
	public entityName = 'systemOption';

	constructor(
		public transportService: TransportService,
		public service: SystemOptionService,
	) {
		super();
	}
}
