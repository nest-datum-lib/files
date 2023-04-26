import { Controller } from '@nestjs/common';
import { OptionHttpController } from '@nest-datum/option';
import { ProviderOptionService } from './provider-option.service';

@Controller(`/provider-option`)
export class ProviderOptionHttpController extends OptionHttpController {
	constructor(
		protected service: ProviderOptionService,
	) {
		super();
	}
}
