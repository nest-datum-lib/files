import { Controller } from '@nestjs/common';
import { OptionHttpController } from '@nest-datum/option';
import { SystemOptionService } from './system-option.service';

@Controller(`${process.env.SERVICE_FILES}/system-option`)
export class SystemOptionHttpController extends OptionHttpController {
	constructor(
		protected service: SystemOptionService,
	) {
		super();
	}
}