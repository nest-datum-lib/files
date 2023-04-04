import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionHttpController } from '@nest-datum/option';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller(`system/option`)
export class SystemSystemOptionHttpController extends OptionOptionHttpController {
	protected entityId = 'systemId';
	protected entityOptionId = 'systemOptionId';

	constructor(
		protected transportService: TransportService,
		protected entityService: SystemSystemOptionService,
	) {
		super();
	}
}
