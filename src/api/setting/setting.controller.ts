import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { SettingTcpController as NestDatumSettingTcpController } from '@nest-datum/setting';
import { SettingService } from './setting.service';

@Controller()
export class SettingController extends NestDatumSettingTcpController {
	constructor(
		public transportService: TransportService,
		public service: SettingService,
	) {
		super();
	}
}
