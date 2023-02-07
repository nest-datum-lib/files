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
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	file as utilsCheckFile,
} from '@nest-datum-utils/check';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpOptionController as NestDatumHttpOptionController } from '@nest-datum-common/controller';
import { ProviderService } from '../provider.service';
import { ProviderProviderOptionService } from '../../provider-provider-option/provider-provider-option.service';

@Controller(`provider`)
export class ProviderController extends NestDatumHttpOptionController {
	constructor(
		public transportService: TransportService,
		public service: ProviderService,
		public providerProviderOptionService: ProviderProviderOptionService,
	) {
		super();
	}

	async validateCreateOption(options) {
		if (!utilsCheckStrId(options['providerOptionId'])) {
			throw new HttpException(`Property "providerOptionId" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options['providerId'])) {
			throw new HttpException(`Property "providerId" is not valid.`, 403);
		}
		return await this.validateUpdate(options);
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new HttpException(`Property "name" is not valid.`, 403);
		}
		if (!utilsCheckStrId(options['providerStatusId'])) {
			throw new HttpException(`Property "providerStatusId" is not valid.`, 403);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['providerStatusId'] && utilsCheckStrId(options['providerStatusId'])) 
				? { providerStatusId: options['providerStatusId'] } 
				: {},
		};
	}

	@Post(':id/option')
	async createOption(
		@AccessToken() accessToken: string,
		@Param('id') providerOptionId: string,
		@Body('providerId') providerId: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.providerProviderOptionService.create(await this.validateCreateOption({
			accessToken,
			providerOptionId,
			providerId,
		})));
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
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			providerStatusId,
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
		@Body('userId') userId: string,
		@Body('providerStatusId') providerStatusId: string,
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
			providerStatusId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
