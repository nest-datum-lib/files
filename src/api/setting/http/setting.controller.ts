import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { SettingHttpController as NestDatumSettingHttpController } from '@nest-datum/setting';
import { SettingService } from '../setting.service';

@Controller(`${process.env.SERVICE_FILES}/setting`)
export class SettingController extends NestDatumSettingHttpController {
	constructor(
		public transportService: TransportService,
		public service: SettingService,
	) {
		super();
	}
}
