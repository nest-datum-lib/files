import { BindService } from '@nest-datum/bind';

export class RoleAccessService extends BindService {
	protected readonly mainRelationColumnName: string = 'roleId';
	protected readonly optionRelationColumnName: string = 'accessId';
}
