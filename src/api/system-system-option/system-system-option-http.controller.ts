import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller(`${process.env.SERVICE_FILES}/system/option`)
export class SystemSystemOptionHttpController extends BindHttpController {
	constructor(
		protected service: SystemSystemOptionService,
	) {
		super();
	}
}
