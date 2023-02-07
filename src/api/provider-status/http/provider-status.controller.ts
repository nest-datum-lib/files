import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusHttpController as NestDatumStatusHttpController } from '@nest-datum/status';
import { ProviderStatusService } from '../provider-status.service';

@Controller(`provider-status`)
export class ProviderStatusController extends NestDatumStatusHttpController {
	constructor(
		public transportService: TransportService,
		public service: ProviderStatusService,
	) {
		super();
	}
}
