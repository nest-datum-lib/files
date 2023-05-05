import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { SystemSystemOptionService } from './system-system-option.service';

@Controller(`/system/option`)
export class SystemSystemOptionHttpController extends BindHttpController {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';
	
	constructor(
		protected service: SystemSystemOptionService,
	) {
		super();
	}
}
