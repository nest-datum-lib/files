import { Injectable } from '@nestjs/common';
import { ContentManyService } from '@nest-datum/many';

@Injectable()
export class SystemSystemSystemOptionService extends ContentManyService {
	protected readonly mainRelationColumnName: string = 'systemId';
	protected readonly optionRelationColumnName: string = 'systemSystemOptionId';
}
