import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { HttpController as NestDatumHttpController } from '../../../../@nest-datum-common/controller/src';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';

@Controller()
export class OptionOptionHttpController extends NestDatumHttpController {
	public transportService;
	public service;
	public columnOptionId;
	public columnOptionOptionId;

	async validateCreate(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options[this.columnOptionId])) {
			throw new WarningException(`Property "${this.columnOptionId}" is not valid.`);
		}
		if (!utilsCheckStrId(options[this.columnOptionOptionId])) {
			throw new WarningException(`Property "${this.columnOptionOptionId}" is not valid.`);
		}

		return {
			userId: user['id'],
			[this.columnOptionId]: options[this.columnOptionId],
			[this.columnOptionOptionId]: options[this.columnOptionOptionId],
		};
	}
}
