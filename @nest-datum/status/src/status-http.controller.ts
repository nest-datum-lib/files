import { HttpException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { HttpController as NestDatumHttpController } from '../../../@nest-datum-common/controller/src';
import { strName as utilsCheckStrName } from '@nest-datum-utils/check';

@Controller()
export class StatusHttpController extends NestDatumHttpController {
	public transportService;
	public serviceName;
	public entityName;

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new HttpException(`Property "name" is not valid.`, 403);
		}
		return await this.validateUpdate(options);
	}
}
