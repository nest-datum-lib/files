import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { ProviderProviderOptionService } from './provider-provider-option.service';

@Controller(`${process.env.SERVICE_FILES}/provider/option`)
export class ProviderProviderOptionHttpController extends BindHttpController {
	constructor(
		protected service: ProviderProviderOptionService,
	) {
		super();
	}
}
