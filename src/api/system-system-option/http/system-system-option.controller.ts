import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionHttpController as NestDatumOptionOptionHttpController } from '@nest-datum/option';
import { SystemSystemOptionService } from '../system-system-option.service';

@Controller(`system/option`)
export class SystemSystemOptionController extends NestDatumOptionOptionHttpController {
	public columnOptionId = 'systemId';
	public columnOptionOptionId = 'systemOptionId';

	constructor(
		public transportService: TransportService,
		public service: SystemSystemOptionService,
	) {
		super();
	}
}
