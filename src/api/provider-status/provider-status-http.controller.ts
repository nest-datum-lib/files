import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusHttpController } from '@nest-datum/status';
import { ProviderStatusService } from './provider-status.service';

@Controller(`provider-status`)
export class ProviderStatusHttpController extends StatusHttpController {
	constructor(
		public transportService: TransportService,
		public entityService: ProviderStatusService,
	) {
		super();
	}
}
