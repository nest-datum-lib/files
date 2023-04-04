import { Injectable } from '@nestjs/common';
import { MainService } from '@nest-datum/main';

@Injectable()
export class AccessService extends MainService {
	protected readonly withEnvKey: boolean = true;
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly mainRelationColumnName: string = 'accessId';
	protected readonly optionRelationColumnName: string = 'accessOptionId';

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			accessStatusId: true,
			name: true,
			description: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			name: true,
			description: true,
		});
	}
}
