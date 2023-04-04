import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	file as utilsCheckFile,
} from '@nest-datum-utils/check';
import { FileService } from './file.service';

@Controller()
export class FileTcpController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: FileService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['systemId'])) {
			throw new WarningException(`Property "systemId" is not valid.`);
		}
		if (!utilsCheckFile(options['files'])) {
			throw new WarningException(`Property "files" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['files'] && utilsCheckFile(options['files'])) 
				? { files: options['files'] } 
				: {},
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

	@MessagePattern({ cmd: 'file.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'file.one' })
	async one(payload) {
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
	async update(payload) {
		return await super.update(payload);
	}
}
