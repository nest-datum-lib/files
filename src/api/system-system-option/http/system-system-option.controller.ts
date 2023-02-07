import { 
	Controller,
	Post,
	Body,
	Param,
} from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { OptionOptionHttpController as NestDatumOptionOptionHttpController } from '@nest-datum/option';
import { SystemSystemOptionService } from '../system-system-option.service';

@Controller(`system/option`)
export class SystemSystemOptionController extends NestDatumOptionOptionHttpController {
	public columnOptionId = 'systemId';
	public columnOptionOptionId = 'systemOptionId';

	constructor(
		public transportService: TransportService,
		public service: SystemSystemOptionService,
	) {
		super();
	}

	@Post(':id')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') systemOptionId: string,
		@Body('systemId') systemId: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			systemOptionId,
			systemId,
		})));
	}
}
