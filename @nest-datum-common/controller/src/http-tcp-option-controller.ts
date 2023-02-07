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
import { HttpTcpController } from './http-tcp-controller';

export class HttpTcpOptionController extends HttpTcpController {
	public transportService;
	public serviceName = process.env.SERVICE_HTTP;
	public entityName = 'setting';

	@Post(':id/options')
	async createOptions(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() data,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transportService.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.createOptions`,
		}, await this.validateOptions({
			accessToken,
			id,
			data,
		})));
	}
}
