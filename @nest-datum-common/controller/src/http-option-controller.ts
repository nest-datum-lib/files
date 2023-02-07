import { 
	Get, 
	Delete,
	Post,
	Patch,
	Body,
	Param,
	Query,
	HttpException,
} from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from './http-controller';

export class HttpOptionController extends HttpController {
	public transportService;
	public service;

	@Post(':id/options')
	async createOptions(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() data,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.createOptions(await this.validateOptions({
			accessToken,
			id,
			data,
		})));
	}
}
