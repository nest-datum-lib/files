import { Express } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { 
	UseInterceptors,
	UploadedFiles,
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
import { HttpTcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strPath as utilsCheckStrPath,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
} from '@nest-datum-utils/check';

@Controller(`${process.env.SERVICE_FILES}/file`)
export class FileHttpTcpController extends HttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FILES;

	constructor(
		protected transport: TransportService,
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

	@Post()
	@UseInterceptors(FilesInterceptor('files'))
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemId') systemId: string,
		@Body('parentId') parentId: string,
		@Body('path') path: string,
		@UploadedFiles() files: Array<Express.Multer.File>,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			id,
			userId,
			systemId,
			parentId,
			path,
			files,
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('systemId') systemId: string,
		@Body('parentId') parentId: string,
		@Body('path') path: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
		@Body('createdAt') createdAt: string,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.update`,
		}, await this.validateUpdate({
			accessToken,
			id,
			newId,
			userId,
			systemId,
			parentId,
			path,
			name,
			description,
			isNotDelete,
			isDeleted,
			createdAt,
		})));
	}
}
