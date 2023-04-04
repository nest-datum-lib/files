import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	MethodNotAllowedException,
} from '@nestjs/common';
import { checkToken } from '@nest-datum-common/jwt';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
} from '@nest-datum-utils/check';
import { SystemService } from './system.service';

@Controller(`${process.env.SERVICE_FILES}/system`)
export class SystemHttpController extends HttpController {
	constructor(
		protected service: SystemService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {
			description: '',
		};

		if (utilsCheckExists(options['userId'])) {
			if (!utilsCheckStrId(options['userId'])) {
				throw new MethodNotAllowedException(`Property "userId" is not valid.`);
			}
			output['userId'] = options['userId'];
		}
		if (utilsCheckExists(options['systemStatusId'])) {
			if (!utilsCheckStrId(options['systemStatusId'])) {
				throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
			}
			output['systemStatusId'] = options['systemStatusId'];
		}
		if (utilsCheckExists(options['providerId'])) {
			if (!utilsCheckStrId(options['providerId'])) {
				throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
			}
			output['providerId'] = options['providerId'];
		}
		if (utilsCheckExists(options['name'])) {
			if (!utilsCheckStrName(options['name'])) {
				throw new MethodNotAllowedException(`Property "name" is not valid.`);
			}
			output['name'] = options['name'];
		}
		if (utilsCheckExists(options['description'])) {
			if (!utilsCheckStrDescription(options['description'])) {
				throw new MethodNotAllowedException(`Property "description" is not valid.`);
			}
			output['description'] = options['description'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
		};
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			systemStatusId,
			providerId,
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
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
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
			systemStatusId,
			providerId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
