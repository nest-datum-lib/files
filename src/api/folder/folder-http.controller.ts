import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	ForbiddenException,
} from '@nestjs/common';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from '@nest-datum/controller';
import { FolderService } from './folder.service';

@Controller(`folder`)
export class FolderHttpController extends HttpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: FolderService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new ForbiddenException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemId'])) {
			throw new ForbiddenException(`Property "systemId" is not valid.`);
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

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemId') systemId: string,
		@Body('parentId') parentId: string,
		@Body('path') path: string,
		@Body('name') name: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.entityService.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			systemId,
			parentId,
			path,
			name,
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
		return await this.serviceHandlerWrapper(async () => await this.entityService.update(await this.validateUpdate({
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
