import { Controller } from '@nestjs/common';
import { OptionHttpController } from '@nest-datum/option';
import { ProviderOptionService } from './provider-option.service';

@Controller(`${process.env.SERVICE_FILES}/provider-option`)
export class ProviderOptionHttpController extends OptionHttpController {
	constructor(
		protected service: ProviderOptionService,
	) {
		super();
	}
}
