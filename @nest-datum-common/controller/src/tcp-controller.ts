import { Controller as NestjsController } from '@nestjs/common';
import { Controller } from './controller';

@NestjsController()
export class TcpController extends Controller {
	public transportService;
	public service;

	async many(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.many(await this.validateMany(payload)));
	}

	async one(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.one(await this.validateOne(payload)));
	}

	async drop(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.drop(await this.validateDrop(payload)));
	}

	async dropMany(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.dropMany(await this.validateDropMany(payload)));
	}

	async create(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate(payload)));
	}

	async update(payload) {
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate(payload)));
	}
}
