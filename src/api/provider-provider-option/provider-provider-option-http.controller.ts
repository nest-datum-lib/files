import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { ProviderProviderOptionService } from './provider-provider-option.service';

@Controller(`/provider/option`)
export class ProviderProviderOptionHttpController extends BindHttpController {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';

	constructor(
		protected service: ProviderProviderOptionService,
	) {
		super();
	}
}
