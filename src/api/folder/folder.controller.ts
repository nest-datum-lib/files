import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController as NestDatumTcpController } from '@nest-datum-common/controller';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	file as utilsCheckFile,
} from '@nest-datum-utils/check';
import { FolderService } from './folder.service';

@Controller()
export class FolderController extends NestDatumTcpController {
	constructor(
		public transportService: TransportService,
		public service: FolderService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemId'])) {
			throw new WarningException(`Property "systemId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['systemId'] && utilsCheckStrId(options['systemId'])) 
				? { systemId: options['systemId'] } 
				: {},
			...(options['parentId'] && utilsCheckStrId(options['parentId'])) 
				? { parentId: options['parentId'] } 
				: {},
			...(options['path'] && utilsCheckStr(options['path'])) 
				? { path: options['path'] } 
				: {},
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
	async update(payload) {
		return await super.update(payload);
	}
}
