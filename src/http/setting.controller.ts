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
import { SettingService } from '../api/setting/setting.service';

@ApiTags(`[ ${process.env.SERVICE_DATA_TYPE} ] Settings`)
@Controller(`setting`)
export class SettingController {
	constructor(
		private readonly settingService: SettingService,
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
			const many = await this.settingService.many({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_MANY'] ],
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
			const output = await this.settingService.one({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_ONE'] ],
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
			await this.settingService.drop({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_DROP'] ],
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
			await this.settingService.dropMany({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_DROP_MANY'] ],
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
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('dataTypeId') dataTypeId: string,
		@Body('value') value: string,
		@Body('regex') regex: string,
		@Body('isRequired') isRequired: boolean,
	) {
		try {
			const output = await this.settingService.create({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				userId: Validators.id('userId', userId),
				name: Validators.str('name', name, {
					isRequired: true,
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', description, {
					min: 1,
					max: 255,
				}),
				dataTypeId: Validators.id('dataTypeId', dataTypeId, {
					isRequired: true,
				}),
				value: Validators.valueWithDataType('value', value, {
					dataTypeId,
				}),
				regex: Validators.regex('regex', regex),
				isRequired: Validators.bool('isRequired', isRequired),
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
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('dataTypeId') dataTypeId: string,
		@Body('value') value: string,
		@Body('regex') regex: string,
		@Body('isRequired') isRequired: boolean,
		@Body('isDeleted') isDeleted: boolean,
		@Body('createdAt') createdAt: string,
	) {
		try {
			await this.settingService.update({
				user: Validators.token('accessToken', accessToken, {
					accesses: [ process['ACCESS_FILES_SETTING_UPDATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', id),
				newId: Validators.id('newId', newId),
				userId: Validators.id('userId', userId),
				name: Validators.str('name', name, {
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', description, {
					min: 1,
					max: 255,
				}),
				dataTypeId: Validators.id('dataTypeId', dataTypeId),
				value: Validators.valueWithDataType('value', value, {
					dataTypeId: dataTypeId,
				}),
				regex: Validators.regex('regex', regex),
				isRequired: Validators.bool('isRequired', isRequired),
				isDeleted: Validators.bool('isDeleted', isDeleted),
			});

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}
}
