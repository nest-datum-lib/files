import { 
	Get, 
	Delete,
	Post,
	Patch,
	Body,
	Param,
	Query,
	HttpException,
} from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { Controller } from './controller';

export class HttpController extends Controller {
	public transportService;
	public service;

	@Get()
	async many(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('query') query: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => {
			const many = await this.service.many(await this.validateMany({
				accessToken,
				select,
				relations,
				page,
				limit,
				query,
				filter,
				sort,
			}));

			return {
				rows: many[0],
				total: many[1],
			};
		});
	}

	@Get(':id')
	async one(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Param('id') id: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => await this.service.one(await this.validateOne({
			accessToken,
			select,
			relations,
			id,
		})));
	}

	@Delete(':id')
	async drop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.drop(await this.validateDrop({
			accessToken,
			id,
		})));
	}

	@Delete(':id')
	async dropMany(
		@AccessToken() accessToken: string,
		@Param('ids') ids: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.dropMany(await this.validateDropMany({
			accessToken,
			ids,
		})));
	}

	// @AccessToken() accessToken: string,
	// 	@Body('id') id: string,
	// 	@Body('userId') userId: string,
	// 	@Body('name') name: string,
	// 	@Body('description') description: string,
	// 	@Body('dataTypeId') dataTypeId: string,
	// 	@Body('regex') regex: string,
	// 	@Body('isNotDelete') isNotDelete: boolean,
	@Post()
	async create(...payload) {
		console.log('HTTP create', payload);

		// return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
		// 	accessToken,
		// 	id,
		// 	userId,
		// 	name,
		// 	description,
		// 	dataTypeId,
		// 	regex,
		// 	isNotDelete,
		// })));
	}

	// @AccessToken() accessToken: string,
	// 	@Param('id') id: string,
	// 	@Body('id') newId: string,
	// 	@Body('userId') userId: string,
	// 	@Body('name') name: string,
	// 	@Body('description') description: string,
	// 	@Body('dataTypeId') dataTypeId: string,
	// 	@Body('regex') regex: string,
	// 	@Body('isNotDelete') isNotDelete: boolean,
	// 	@Body('isDeleted') isDeleted: boolean,
	@Patch(':id')
	async update(...payload) {
		console.log('HTTP update', payload);
		
		// return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
		// 	accessToken,
		// 	id,
		// 	newId,
		// 	userId,
		// 	name,
		// 	description,
		// 	dataTypeId,
		// 	regex,
		// 	isNotDelete,
		// 	isDeleted,
		// })));
	}
}
