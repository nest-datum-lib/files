import { Controller as NestjsController } from '@nestjs/common';
import { TcpController } from './tcp-controller';

@NestjsController()
export class TcpOptionController extends TcpController {
	public transportService;
	public service;

	async createOptions(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.createOptions(await this.validateOptions(payload)));
	}
}
