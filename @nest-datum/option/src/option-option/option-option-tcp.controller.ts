import { 
	Controller,
	HttpException, 
} from '@nestjs/common';
import { TcpController as NestDatumTcpController } from '../../../../@nest-datum-common/controller/src';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';

@Controller()
export class OptionOptionTcpController extends NestDatumTcpController {
	public transportService;
	public service;
	public columnOptionId;
	public columnOptionOptionId;

	async validateCreate(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new HttpException(`User is undefined or token is not valid.`, 403);
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options[this.columnOptionId])) {
			throw new HttpException(`Property "${this.columnOptionId}" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options[this.columnOptionOptionId])) {
			throw new HttpException(`Property "${this.columnOptionOptionId}" is not valid.`, 403);
		}

		return {
			userId: user['id'],
			[this.columnOptionId]: options[this.columnOptionId],
			[this.columnOptionOptionId]: options[this.columnOptionOptionId],
		};
	}
}
