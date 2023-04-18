import { 
	Controller,
	Get,
	Query,
	Post,
	Patch,
	Body,
	Param,
	MethodNotAllowedException,
} from '@nestjs/common';
import { checkToken } from '@nest-datum-common/jwt';
import { AccessToken } from '@nest-datum-common/decorators';
import { MainHttpController } from '@nest-datum/main';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
} from '@nest-datum-utils/check';
import { SystemSystemOptionService } from '../system-system-option/system-system-option.service';
import { SystemSystemSystemOptionService } from '../system-system-system-option/system-system-system-option.service';
import { SystemService } from './system.service';

@Controller(`${process.env.SERVICE_FILES}/system`)
export class SystemHttpController extends MainHttpController {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemOptionId';

	constructor(
		protected readonly service: SystemService,
		protected readonly serviceOptionRelation: SystemSystemOptionService,
		protected readonly serviceOptionContent: SystemSystemSystemOptionService,
	) {
		super();
	}

	async validateManager(options: object = {}) {
		if (!utilsCheckStrIdExists(options['systemId'])) {
			throw new MethodNotAllowedException(`Property "systemId" is not valid.`);
		}
		return { ...await super.validateMany(options), systemId: options['systemId'] };
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['systemStatusId'])) {
			throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckExists(options['systemStatusId'])) {
			if (!utilsCheckStrId(options['systemStatusId'])) {
				throw new MethodNotAllowedException(`Property "systemStatusId" is not valid.`);
			}
			output['systemStatusId'] = options['systemStatusId'];
		}
		if (utilsCheckExists(options['providerId'])) {
			if (!utilsCheckStrId(options['providerId'])) {
				throw new MethodNotAllowedException(`Property "providerId" is not valid.`);
			}
			output['providerId'] = options['providerId'];
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
			...await super.validateUpdate(options),
			...output,
		};
	}

	@Get(':id/manager')
	async manager(
		@AccessToken() accessToken: string,
		@Param('id') systemId: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('query') query: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => {
			const output = await this.service.manager(await this.validateManager({
				accessToken,
				systemId,
				select,
				relations,
				page,
				limit,
				query,
				filter,
				sort,
			}));

			return { rows: (output['rows'] ?? output[0]), total: (output['total'] ?? output[1]) };
		});
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('envKey') envKey: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			envKey,
			userId,
			systemStatusId,
			providerId,
			name,
			description,
			isNotDelete,
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('envKey') envKey: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
			accessToken,
			id,
			newId,
			envKey,
			userId,
			systemStatusId,
			providerId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
