import { Controller } from '@nestjs/common';
import { StatusHttpController } from '@nest-datum/status';
import { ProviderStatusService } from './provider-status.service';

@Controller(`${process.env.SERVICE_FILES}/provider-status`)
export class ProviderStatusHttpController extends StatusHttpController {
	constructor(
		protected service: ProviderStatusService,
	) {
		super();
	}
}
