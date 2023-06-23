import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { TcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strPath as utilsCheckStrPath,
	strName as utilsCheckStrName,
	strDescription as utilsCheckStrDescription,
} from '@nest-datum-utils/check';
import { FileService } from './file.service';

@Controller()
export class FileTcpController extends TcpController {
	constructor(
		protected service: FileService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['systemId'])) {
			throw new MethodNotAllowedException(`Property "systemId" is not valid.`);
		}
		if (utilsCheckExists(options['parentId'])) {
			if (!utilsCheckStrId(options['parentId'])) {
				throw new MethodNotAllowedException(`Property "parentId" is not valid.`);
			}
		}
		if (utilsCheckExists(options['path'])) {
			if (!utilsCheckStrPath(options['path'])) {
				throw new MethodNotAllowedException(`Property "path" is not valid.`);
			}
		}
		if (utilsCheckExists(options['name'])) {
			if (!utilsCheckStrName(options['name'])) {
				throw new MethodNotAllowedException(`Property "name" is not valid.`);
			}
		}
		if (utilsCheckExists(options['description'])) {
			if (!utilsCheckStrDescription(options['description'])) {
				throw new MethodNotAllowedException(`Property "description" is not valid.`);
			}
		}
		return await super.validateCreate(options);
	}

	async validateUpdate(options) {
		const output = {};

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

	@MessagePattern({ cmd: 'file.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'file.one' })
	async one(payload) {
		console.log('payload', payload);

		return await super.one(payload);
	}

	@EventPattern('file.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('file.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('file.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('file.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
