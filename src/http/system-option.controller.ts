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
import * as Validators from '@nest-datum/validators';
import { AccessToken } from '@nest-datum/common';
import { 
	RegistryService,
	LogsService, 
} from '@nest-datum/services';
import { SystemOptionService } from '../api/system-option/system-option.service';

@ApiTags(`[ ${process.env.SERVICE_FILES} ] File system.`)
@Controller(`system-option`)
export class SystemOptionController {
	constructor(
		private readonly registryService: RegistryService,
		private readonly logsService: LogsService,
		private readonly systemOptionService: SystemOptionService,
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
			const many = await this.systemOptionService.many({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
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
			this.logsService.emit(err);
			
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
			const output = await this.systemOptionService.one({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
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
			this.logsService.emit(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Delete(':id')
	async drop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		try {
			await this.systemOptionService.drop({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				id: Validators.id('id', id, {
					isRequired: true,
				}),
			});

			return true;
		}
		catch (err) {
			this.logsService.emit(err);

			throw new HttpException(err.message, err.httpCode || 500);
		}
	}

	@Delete()
	async dropMany(
		@AccessToken() accessToken: string,
		@Body('ids') ids: string,
	) {
		try {
			await this.systemOptionService.dropMany({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
				}),
				ids: Validators.arr('ids', ids, {
					isRequired: true,
					min: 1,
				}),
			});

			return true;
		}
		catch (err) {
			this.logsService.emit(err);
			
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
		@Body('defaultValue') defaultValue: string,
		@Body('regex') regex: string,
		@Body('isRequired') isRequired: boolean,
		@Body('isMultiline') isMultiline: boolean,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		try {
			const output = await this.systemOptionService.create({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
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
				defaultValue: Validators.valueWithDataType('defaultValue', defaultValue, {
					dataTypeId,
				}),
				regex: Validators.regex('regex', regex),
				isRequired: Validators.bool('isRequired', isRequired),
				isMultiline: Validators.bool('isMultiline', isMultiline),
				isNotDelete: Validators.bool('isNotDelete', isNotDelete),
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
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('dataTypeId') dataTypeId: string,
		@Body('defaultValue') defaultValue: string,
		@Body('regex') regex: string,
		@Body('isRequired') isRequired: boolean,
		@Body('isMultiline') isMultiline: boolean,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
		@Body('createdAt') createdAt: string,
	) {
		try {
			await this.systemOptionService.update({
				user: Validators.token('accessToken', accessToken, {
					secret: process.env.JWT_SECRET_ACCESS_KEY,
					timeout: process.env.JWT_ACCESS_TIMEOUT,
					isRequired: true,
					role: {
						name: [ 'Admin' ],
					},
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
				defaultValue: Validators.valueWithDataType('defaultValue', defaultValue, {
					dataTypeId,
				}),
				regex: Validators.regex('regex', regex),
				isRequired: Validators.bool('isRequired', isRequired),
				isMultiline: Validators.bool('isMultiline', isMultiline),
				isNotDelete: Validators.bool('isNotDelete', isNotDelete),
				isDeleted: Validators.bool('isDeleted', isDeleted),
				createdAt: Validators.date('createdAt', createdAt),
			});

			return true;
		}
		catch (err) {
			this.logsService.emit(err);
			
			throw new HttpException(err.message, err.httpCode || 500);
		}
	}
}
