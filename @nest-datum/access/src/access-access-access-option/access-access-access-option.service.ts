import { Injectable } from '@nestjs/common';
import { ContentManyService } from '@nest-datum/many';

@Injectable()
export class AccessAccessAccessOptionService extends ContentManyService {
	protected readonly mainRelationColumnName: string = 'accessId';
	protected readonly optionRelationColumnName: string = 'accessAccessOptionId';
}
