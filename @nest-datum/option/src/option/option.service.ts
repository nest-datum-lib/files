import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';

@Injectable()
export class OptionService extends SqlService {
	public entityColumnOption;
	public entityConstructor;

	constructor(
		public repository,
		public repositoryOptionOption,
		public connection,
		public cacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		name: true,
		description: true,
		dataTypeId: true,
		defaultValue: true,
		regex: true,
		isMultiline: true,
		isRequired: true,
		isNotDelete: true,
		isDeleted: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
		defaultValue: true,
		regex: true,
	};

	async dropIsDeletedRows(repository, id: string): Promise<any> {
		const entity = await this.repository.findOne({
			where: {
				id,
			},
		});

		if (entity['isDeleted'] === true) {
			console.log('this.entityColumnOption', entity, this.entityColumnOption, id);

			await this.repositoryOptionOption.delete({ [this.entityColumnOption]: id });
			
			console.log('11111111');

			await this.repository.delete({ id });

			console.log('22222222');
		}
		else {
			await repository.save(Object.assign(new this.entityConstructor(), { id, isDeleted: true }));
		}
		return entity;
	}
}
