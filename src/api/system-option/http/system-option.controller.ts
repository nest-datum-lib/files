import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpController as NestDatumOptionHttpController } from '@nest-datum/option';
import { SystemOptionService } from '../system-option.service';

@Controller(`system-option`)
export class SystemOptionController extends NestDatumOptionHttpController {
	public serviceName = process.env.SERVICE_FILES;
	public entityName = 'systemOption';

	constructor(
		public transportService: TransportService,
		public service: SystemOptionService,
	) {
		super();
	}
}
