import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	MethodNotAllowedException,
} from '@nestjs/common';
import { checkToken } from '@nest-datum-common/jwt';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strPath as utilsCheckStrPath,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { FolderService } from './folder.service';

@Controller(`/folder`)
export class FolderHttpController extends HttpController {
	constructor(
		protected service: FolderService,
	) {
		super();
	}

	async validateCreate(options) {
		const output = {};

		if (utilsCheckExists(options['systemId'])) {
			if (!utilsCheckStrId(options['systemId'])) {
				throw new MethodNotAllowedException(`Property "systemId" is not valid.`);
			}
			output['systemId'] = options['systemId'];
		}
		if (utilsCheckExists(options['parentId'])) {
			if (!utilsCheckStrId(options['parentId'])) {
				throw new MethodNotAllowedException(`Property "parentId" is not valid.`);
			}
			output['parentId'] = options['parentId'];
		}
		if (utilsCheckExists(options['path'])) {
			if (!utilsCheckStrPath(options['path'])) {
				throw new MethodNotAllowedException(`Property "path" is not valid.`);
			}
			output['path'] = options['path'];
		}
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
			...await super.validateCreate(options),
			...output,
		};
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
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemId') systemId: string,
		@Body('parentId') parentId: string,
		@Body('path') path: string,
		@Body('name') name: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
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
		@Body('createdAt') createdAt: string,
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
			createdAt,
		})));
	}
}
