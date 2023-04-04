import { Injectable } from '@nestjs/common';
import { FuseService } from '@nest-datum/fuse';

@Injectable()
export class StatusService extends FuseService {
	protected readonly withTwoStepRemoval: boolean = false;

	protected manyGetColumns(customColumns: object = {}): object {
		return {
			...super.manyGetColumns(customColumns),
			userId: true,
			name: true,
			description: true,
		};
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
		});
	}
}
