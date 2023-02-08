import { FilesInterceptor } from '@nestjs/platform-express';
import { 
	UseInterceptors,
	UploadedFiles,
	Controller,
	Post,
	Patch,
	Body,
	Param,
	HttpException,
} from '@nestjs/common';
import {
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	file as utilsCheckFile,
} from '@nest-datum-utils/check';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController as NestDatumHttpController } from '@nest-datum-common/controller';
import { FileService } from '../file.service';

@Controller(`file`)
export class FileController extends NestDatumHttpController {
	constructor(
		public transportService: TransportService,
		public service: FileService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['systemId'])) {
			throw new HttpException(`Property "systemId" is not valid.`, 403);
		}
		if (!utilsCheckFile(options['files'])) {
			throw new HttpException(`Property "files" is not valid.`, 403);
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

	@Post()
	@UseInterceptors(FilesInterceptor('files'))
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemId') systemId: string,
		@Body('parentId') parentId: string,
		@Body('path') path: string,
		@UploadedFiles() files: Array<any>,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
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
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
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
		})));
	}
}
