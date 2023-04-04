import { Injectable } from '@nestjs/common';
import { FuseService } from '@nest-datum/fuse';

@Injectable()
export class BindService extends FuseService {
	protected readonly mainRelationColumnName: string;
	protected readonly optionRelationColumnName: string;
	protected readonly repositoryCache;

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(),
			[this.mainRelationColumnName]: true,
			[this.optionRelationColumnName]: true,
		});
	}

	protected async createProperties(payload: object): Promise<any> {
		const processedPayload = { ...payload };

		delete payload['entityOptionId'];
		delete payload['entityId'];
		delete payload[this.mainRelationColumnName];
		delete payload[this.optionRelationColumnName];

		return {
			[this.optionRelationColumnName]: processedPayload['entityOptionId'] || processedPayload[this.optionRelationColumnName],
			[this.mainRelationColumnName]: processedPayload['entityId'] || processedPayload[this.mainRelationColumnName],
			...payload,
		};
	}

	protected async createBefore(payload): Promise<any> {
		this.repositoryCache.drop({ key: [ this.prefix(), 'many' ] });

		return await super.createBefore(payload);
	}

	protected async updateBefore(payload): Promise<any> {
		this.repositoryCache.drop({ key: [ this.prefix(), 'many' ] });

		return await super.updateBefore(payload);
	}
}
