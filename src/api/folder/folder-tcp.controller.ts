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
import { FolderService } from './folder.service';
import { FolderCreateDto, FolderUpdateDto } from "./folder.dto";

@Controller()
export class FolderTcpController extends TcpController {
	constructor(
		protected service: FolderService,
	) {
		super();
	}

	async validateCreate(options: FolderCreateDto) {
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

	async validateUpdate(options: FolderUpdateDto) {
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

	@MessagePattern({ cmd: 'folder.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'folder.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('folder.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('folder.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('folder.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('folder.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
