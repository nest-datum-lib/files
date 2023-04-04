import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionHttpController } from '@nest-datum/option';
import { SystemOptionService } from './system-option.service';

@Controller(`system-option`)
export class SystemOptionHttpController extends OptionHttpController {
	protected serviceName = process.env.SERVICE_FILES;
	protected entityName = 'systemOption';

	constructor(
		protected transportService: TransportService,
		protected entityService: SystemOptionService,
	) {
		super();
	}
}
