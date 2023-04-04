import { 
	Controller,
	Get, 
	Delete,
	Post,
	Patch,
	Body,
	Param,
	Query,
	MethodNotAllowedException,
	UnauthorizedException,
} from '@nestjs/common';
import { HttpTcpController } from '@nest-datum-common/controllers';
import { AccessToken } from '@nest-datum-common/decorators';
import { 
	strId as utilsCheckStrId,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum-common/jwt';

export class MainHttpTcpController extends HttpTcpController {
	protected readonly transport;
	protected readonly serviceName: string;
	protected readonly entityName: string;
	protected readonly entityManyName: string;

	async validateOption(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new UnauthorizedException(`User is undefined or token is not valid.`)
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options['entityOptionId'])) {
			throw new MethodNotAllowedException(`Property "entityOptionId" is nt valid.`);
		}
		if (!utilsCheckStrId(options['entityId'])) {
			throw new MethodNotAllowedException(`Property "entityId" is nt valid.`);
		}

		return {
			accessToken: options['accessToken'],
			userId: user['id'],
			entityId: options['entityId'],
			entityOptionId: options['entityOptionId'],
		};
	}

	async validateOptions(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new UnauthorizedException(`User is undefined or token is not valid.`)
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options['id'])) {
			throw new MethodNotAllowedException(`Property "id" is nt valid.`);
		}
		try {
			options['data'] = JSON.parse(options['data']);
		}
		catch (err) {
		}
		if (!utilsCheckArr(options['data'])) {
			throw new MethodNotAllowedException(`Property "data" is nt valid.`);
		}

		return {
			accessToken: options['accessToken'],
			userId: user['id'],
			id: options['id'],
			data: options['data'],
		};
	}

	@Get('option')
	async optionMany(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('query') query: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityManyName}.many`,
		}, await this.validateMany({
			accessToken,
			select,
			relations,
			page,
			limit,
			query,
			filter,
			sort,
		})));
	}

	@Get('option/:id')
	async optionOne(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Param('id') id: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityManyName}.one`,
		}, await this.validateOne({
			accessToken,
			select,
			relations,
			id,
		})));
	}

	@Delete('option/:id')
	async optionDrop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityManyName}.drop`,
		}, await this.validateDrop({
			accessToken,
			id,
		})));
	}

	@Post(':id/option')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') entityOptionId: string,
		@Body() body,
	) {
		const bodyKeys = Object.keys(body);
		const entityId = body[bodyKeys[0]];

		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityManyName}.create`,
		}, await this.validateOption({
			accessToken,
			entityOptionId,
			entityId,
		})));
	}

	@Post(':id/options')
	async createOptions(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() data,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.content`,
		}, await this.validateOptions({
			accessToken,
			id,
			data,
		})));
	}
}
