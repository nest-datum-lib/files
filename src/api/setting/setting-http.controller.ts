import { Controller } from '@nestjs/common';
import { SettingHttpController as SettingHttpControllerBase } from '@nest-datum/setting';
import { TransportService } from '@nest-datum/transport';
import { SettingService } from './setting.service';

@Controller(`setting`)
export class SettingHttpController extends SettingHttpControllerBase {
	constructor(
		protected transportService: TransportService,
		protected entityService: SettingService,
	) {
		super();
	}
}
