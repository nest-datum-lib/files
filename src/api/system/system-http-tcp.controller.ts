import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	UnauthorizedException,
	MethodNotAllowedException,
} from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { checkToken } from '@nest-datum-common/jwt';
import { AccessToken } from '@nest-datum-common/decorators';
import { MainHttpTcpController } from '@nest-datum/main';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
	strFilled as utilsCheckStrFilled,
	strEnvKey as utilsCheckStrEnvKey,
} from '@nest-datum-utils/check';

@Controller(`${process.env.SERVICE_FILES}/system`)
export class SystemHttpTcpController extends MainHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FILES;
	protected readonly entityName: string = 'system';
	protected readonly entityManyName: string = 'systemOptionRelation';
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';

	constructor(
		protected transport: TransportService,
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
		const output = {};

		if (utilsCheckStrFilled(options['envKey'])) {
			if (!utilsCheckStrEnvKey(options['envKey'])) {
				throw new MethodNotAllowedException(`Property "envKey" is not valid.`);
			}
			output['envKey'] = options['envKey'];
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
		@Body('envKey') envKey: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			id,
			envKey,
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
		@Body('envKey') envKey: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.update`,
		}, await this.validateUpdate({
			accessToken,
			id,
			newId,
			envKey,
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
