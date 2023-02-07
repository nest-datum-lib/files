import { 
	Post,
	Patch,
	Body,
	Param,
	HttpException,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { HttpController as NestDatumHttpController } from '../../../@nest-datum-common/controller/src';
import { AccessToken } from '@nest-datum-common/decorators';
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

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
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
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
