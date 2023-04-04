import { Injectable } from '@nestjs/common';
import { 
	ManyService,
	ContentManyService, 
} from '@nest-datum/many';

@Injectable()
export class OptionService extends ManyService {
	protected readonly withEnvKey: boolean = true;

	protected manyGetColumns(customColumns: object = {}) {
		return ({
		...super.manyGetColumns(customColumns),
			userId: true,
			name: true,
			description: true,
			dataTypeId: true,
			defaultValue: true,
			regex: true,
			isMultiline: true,
			isRequired: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
		});
	}
}
