import { ApiTags } from '@nestjs/swagger';
import { 
	Controller,
	Get, 
	Delete,
	Post,
	Patch,
	Body,
	Param,
	Query,
	HttpException,
} from '@nestjs/common';
import { AccessToken } from 'nest-datum/common/src';
import { BalancerService } from 'nest-datum/balancer/src';
import * as Validators from 'nest-datum/validators/src';
import { SystemService } from '../api/system/system.service';
import { SystemSystemOptionService } from '../api/system-system-option/system-system-option.service';

@ApiTags(`[ ${process.env.SERVICE_FILES} ] File system`)
@Controller(`system`)
export class SystemController {
	constructor(
		private readonly systemService: SystemService,
		private readonly systemSystemOptionService: SystemSystemOptionService,
		private readonly balancerService: BalancerService,
	) {
	}

	@Get('option')
	async optionMany(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('query') query: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<any> {
		try {
			const many = await this.systemSystemOptionService.many({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_MANY'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', relations),
				select: Validators.obj('select', select),
				sort: Validators.obj('sort', sort),
				filter: Validators.obj('filter', filter),
				query: Validators.str('query', query, {
					min: 1,
					max: 255,
				}),
				page: Validators.int('page', page, {
					min: 1,
					default: 1,
				}),
				limit: Validators.int('limit', limit, {
					min: 1,
					default: 20,
				}),
			});

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.balancerService.log(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Get('option/:id')
	async optionOne(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Param('id') id: string,
	): Promise<any> {
		try {
			const output = await this.systemSystemOptionService.one({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_ONE'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', relations),
				select: Validators.obj('select', select),
				id: Validators.id('id', id, {
					isRequired: true,
				}),
			});

			return output;
		}
		catch (err) {
			this.balancerService.log(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Delete('option/:id')
	async optionDrop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		try {
			await this.systemSystemOptionService.drop({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_DROP_OPTION_RELATION_MANY'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id, {
					isRequired: true,
				}),
			});

			return true;
		}
		catch (err) {
			this.balancerService.log(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Post(':id/option')
	async optionCreate(
		@AccessToken() accessToken: string,
		@Param('id') systemOptionId: string,
		@Body('systemId') systemId: string,
		@Body('id') id: string,
	) {
		try {
			const output = await this.systemSystemOptionService.create({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_OPTION_RELATION_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				systemId: Validators.id('systemId', systemId, {
					isRequired: true,
				}),
				systemOptionId: Validators.id('systemOptionId', systemOptionId, {
					isRequired: true,
				}),
			});

			return output;
		}
		catch (err) {
			this.balancerService.log(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

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
		try {
			const many = await this.systemService.many({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_MANY'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', relations),
				select: Validators.obj('select', select),
				sort: Validators.obj('sort', sort),
				filter: Validators.obj('filter', filter),
				query: Validators.str('query', query, {
					min: 1,
					max: 255,
				}),
				page: Validators.int('page', page, {
					min: 1,
					default: 1,
				}),
				limit: Validators.int('limit', limit, {
					min: 1,
					default: 20,
				}),
			});

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Get(':id')
	async one(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Param('id') id: string,
	): Promise<any> {
		try {
			const output = await this.systemService.one({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_ONE'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', relations),
				select: Validators.obj('select', select),
				id: Validators.id('id', id, {
					isRequired: true,
				}),
			});

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Delete(':id')
	async drop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		try {
			await this.systemService.drop({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_DROP'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id, {
					isRequired: true,
				}),
			});

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Delete()
	async dropMany(
		@AccessToken() accessToken: string,
		@Body('ids') ids: string,
	) {
		try {
			await this.systemService.dropMany({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_DROP_MANY'] ],
					isRequired: true,
				}),
				ids: Validators.arr('ids', ids, {
					isRequired: true,
					min: 1,
				}),
			});

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		try {
			const output = await this.systemService.create({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				userId: Validators.id('userId', userId),
				systemStatusId: Validators.id('systemStatusId', systemStatusId, {
					isRequired: true,
				}),
				providerId: Validators.id('providerId', providerId, {
					isRequired: true,
				}),
				name: Validators.str('name', name, {
					isRequired: true,
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', description, {
					min: 1,
					max: 255,
				}),
				isNotDelete: Validators.bool('isNotDelete', isNotDelete),
			});

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Post(':id/options')
	async createOptions(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() data,
	) {
		try {
			const output = await this.systemService.createOptions({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_CREATE_OPTIONS'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				data: Validators.arr('data', data, {
					isRequired: true,
				}),
			});

			return output;
		}
		catch (err) {
			this.logsService.emit(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('systemStatusId') systemStatusId: string,
		@Body('providerId') providerId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
		@Body('createdAt') createdAt: string,
	) {
		try {
			await this.systemService.update({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SYSTEM_UPDATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				newId: Validators.id('newId', newId),
				userId: Validators.id('userId', userId),
				systemStatusId: Validators.id('systemStatusId', systemStatusId),
				providerId: Validators.id('providerId', providerId, {
					isRequired: true,
				}),
				name: Validators.str('name', name, {
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', description, {
					min: 1,
					max: 255,
				}),
				isNotDelete: Validators.bool('isNotDelete', isNotDelete),
				isDeleted: Validators.bool('isDeleted', isDeleted),
				createdAt: Validators.date('createdAt', createdAt),
			});

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}
}
