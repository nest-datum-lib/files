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
import { ProviderService } from '../api/provider/provider.service';

@ApiTags(`[ ${process.env.SERVICE_FILES} ] Sysytem provider`)
@Controller(`provider`)
export class ProviderController {
	constructor(
		private readonly providerService: ProviderService,
		private readonly balancerService: BalancerService,
	) {
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
			const many = await this.providerService.many({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_MANY'] ],
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
			const output = await this.providerService.one({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_ONE'] ],
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
			await this.providerService.drop({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_DROP'] ],
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
			await this.providerService.dropMany({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_DROP_MANY'] ],
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

	@Delete(':id/option/:optionId')
	async dropOption(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Param('optionId') optionId: string,
	) {
		try {
			await this.providerService.dropOption({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_DROP_OPTION'] ],
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

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('providerStatusId') providerStatusId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		try {
			const output = await this.providerService.create({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				userId: Validators.id('userId', userId),
				providerStatusId: Validators.id('providerStatusId', providerStatusId, {
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

	@Post(':id/option')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('optionId') optionId: string,
		@Body() data,
	) {
		try {
			delete data['optionId'];

			const output = await this.providerService.createOption({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_CREATE_OPTION'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				optionId: Validators.id('optionId', optionId, {
					isRequired: true,
				}),
				data: Validators.obj('data', data) || {},
			});

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('providerStatusId') providerStatusId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
		@Body('createdAt') createdAt: string,
	) {
		try {
			await this.providerService.update({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_PROVIDER_UPDATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				newId: Validators.id('newId', newId),
				userId: Validators.id('userId', userId),
				providerStatusId: Validators.id('providerStatusId', providerStatusId),
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
