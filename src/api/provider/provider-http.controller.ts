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
import { MainHttpController } from '@nest-datum/main';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
	strFilled as utilsCheckStrFilled,
	strEnvKey as utilsCheckStrEnvKey,
} from '@nest-datum-utils/check';
import { ProviderProviderOptionService } from '../provider-provider-option/provider-provider-option.service';
import { ProviderProviderProviderOptionService } from '../provider-provider-provider-option/provider-provider-provider-option.service';
import { ProviderService } from './provider.service';

@Controller(`/provider`)
export class ProviderHttpController extends MainHttpController {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerOptionId';

	constructor(
		protected service: ProviderService,
		protected readonly serviceOptionContent: ProviderProviderProviderOptionService,
		protected readonly serviceOptionRelation: ProviderProviderOptionService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['providerStatusId'])) {
			throw new MethodNotAllowedException(`Property "providerStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckStrFilled(options['envKey'])) {
			if (!utilsCheckStrEnvKey(options['envKey'])) {
				throw new MethodNotAllowedException(`Property "envKey" is not valid.`);
			}
			output['envKey'] = options['envKey'];
		}
		if (utilsCheckExists(options['providerStatusId'])) {
			if (!utilsCheckStrId(options['providerStatusId'])) {
				throw new MethodNotAllowedException(`Property "providerStatusId" is not valid.`);
			}
			output['providerStatusId'] = options['providerStatusId'];
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

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('envKey') envKey: string,
		@Body('userId') userId: string,
		@Body('providerStatusId') providerStatusId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			envKey,
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
		@Body('envKey') envKey: string,
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
			envKey,
			userId,
			providerStatusId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
