import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	ForbiddenException,
} from '@nestjs/common';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { HttpOptionController } from '@nest-datum/controller';
import { TransportService } from '@nest-datum/transport';
import { AccessToken } from '@nest-datum-common/decorators';
import { ProviderService } from './provider.service';
import { ProviderProviderOptionService } from '../provider-provider-option/provider-provider-option.service';
import { ProviderOptionService } from '../provider-option/provider-option.service';

@Controller(`provider`)
export class ProviderHttpController extends HttpOptionController {
	constructor(
		protected transportService: TransportService,
		protected entityService: ProviderService,
		protected entityOptionService: ProviderOptionService,
		protected entityOptionContentService: ProviderProviderOptionService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new ForbiddenException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerStatusId'])) {
			throw new ForbiddenException(`Property "providerStatusId" is not valid.`);
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
		return await this.serviceHandlerWrapper(async () => await this.entityService.create(await this.validateCreate({
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
		return await this.serviceHandlerWrapper(async () => await this.entityService.update(await this.validateUpdate({
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
