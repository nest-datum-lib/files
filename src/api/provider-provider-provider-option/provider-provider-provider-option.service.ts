import { Injectable } from '@nestjs/common';
import { ContentManyService } from '@nest-datum/many';

@Injectable()
export class ProviderProviderProviderOptionService extends ContentManyService {
	protected readonly mainRelationColumnName: string = 'providerId';
	protected readonly optionRelationColumnName: string = 'providerProviderOptionId';
}
