import { Injectable } from '@nestjs/common';
import { FuseService } from '@nest-datum/fuse';
import { objQueryRunner as utilsCheckObjQueryRunner } from '@nest-datum-utils/check';

@Injectable()
export class ManyService extends FuseService {
	protected readonly mainRelationColumnName: string;
	protected readonly optionRelationColumnName: string;
	protected readonly repositoryCache;
	protected readonly repositoryConstructor;
	protected readonly repository;
	protected readonly repositoryOptionConstructor;
	protected readonly repositoryOption;
	public readonly contentManyService;

	protected async dropProcessForever(id): Promise<any> {
		this.repositoryCache.drop({ key: [ this.prefix(), 'many', '*' ] });
		this.repositoryCache.drop({ key: [ this.prefix(), 'one', { id } ] });

		if (utilsCheckObjQueryRunner(this.queryRunner) && this.enableTransactions === true) {
			await this.queryRunner.manager.delete(this.repositoryOptionConstructor, { [this.optionRelationColumnName]: id });
			await this.queryRunner.manager.delete(this.repositoryConstructor, id);

			return true;
		}
		await this.repositoryOption.delete({ [this.optionRelationColumnName]: id });
		await this.repository.delete({ id });

		return true;
	}
}
