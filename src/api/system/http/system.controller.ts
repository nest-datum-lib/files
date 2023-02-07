import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	HttpException,
} from '@nestjs/common';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	file as utilsCheckFile,
} from '@nest-datum-utils/check';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpOptionController as NestDatumHttpOptionController } from '@nest-datum-common/controller';
import { SystemService } from '../system.service';
import { SystemSystemOptionService } from '../../system-system-option/system-system-option.service';

@Controller(`system`)
export class SystemController extends NestDatumHttpOptionController {
	constructor(
		public transportService: TransportService,
		public service: SystemService,
		public systemSystemOptionService: SystemSystemOptionService,
	) {
		super();
	}

	async validateCreateOption(options) {
		if (!utilsCheckStrId(options['systemOptionId'])) {
			throw new HttpException(`Property "systemOptionId" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options['systemId'])) {
			throw new HttpException(`Property "systemId" is not valid.`, 403);
		}
		return await this.validateUpdate(options);
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new HttpException(`Property "name" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new HttpException(`Property "providerId" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new HttpException(`Property "systemStatusId" is not valid.`, 403);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['providerId'] && utilsCheckStrId(options['providerId'])) 
				? { providerId: options['providerId'] } 
				: {},
			...(options['systemStatusId'] && utilsCheckStrId(options['systemStatusId'])) 
				? { systemStatusId: options['systemStatusId'] } 
				: {},
		};
	}

	@Post(':id/option')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') systemOptionId: string,
		@Body('systemId') systemId: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.systemSystemOptionService.create(await this.validateCreateOption({
			accessToken,
			systemOptionId,
			systemId,
		})));
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('providerId') providerId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			providerId,
			systemStatusId,
			name,
			description,
			isNotDelete,
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('providerId') providerId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
			accessToken,
			id,
			newId,
			userId,
			providerId,
			systemStatusId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
