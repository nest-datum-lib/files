import { Controller } from '@nestjs/common';
import { SettingHttpController as SettingHttpControllerBase } from '@nest-datum/setting';
import { SettingService } from './setting.service';

@Controller(`${process.env.SERVICE_FILES}/setting`)
export class SettingHttpController extends SettingHttpControllerBase {
	constructor(
		protected service: SettingService,
	) {
		super();
	}
}
