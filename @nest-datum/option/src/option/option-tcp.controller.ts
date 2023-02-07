import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TcpController as NestDatumTcpController } from '../../../../@nest-datum-common/controller/src';
import { 
	strName as utilsCheckStrName,
	strDataType as utilsCheckStrDataType,
} from '@nest-datum-utils/check';

@Controller()
export class OptionTcpController extends NestDatumTcpController {
	public transportService;
	public service;

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrDataType(options['dataTypeId'])) {
			throw new WarningException(`Property "dataTypeId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			defaultValue: String(options['defaultValue'] ?? ''),
		};
	}
}
