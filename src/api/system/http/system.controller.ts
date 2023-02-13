import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	ForbiddenException,
} from '@nestjs/common';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { HttpOptionController } from '@nest-datum/controller';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { SystemService } from '../system.service';
import { SystemSystemOptionService } from '../../system-system-option/system-system-option.service';
import { SystemOptionService } from '../../system-option/system-option.service';

@Controller(`system`)
export class SystemController extends HttpOptionController {
	constructor(
		protected transportService: TransportService,
		protected entityService: SystemService,
		protected entityOptionService: SystemOptionService,
		protected entityOptionContentService: SystemSystemOptionService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new ForbiddenException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new ForbiddenException(`Property "providerId" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new ForbiddenException(`Property "systemStatusId" is not valid.`);
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
		return await this.serviceHandlerWrapper(async () => await this.entityService.create(await this.validateCreate({
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
		return await this.serviceHandlerWrapper(async () => await this.entityService.update(await this.validateUpdate({
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
