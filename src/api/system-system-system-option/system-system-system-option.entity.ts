import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { ContentMany } from '@nest-datum/many';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemSystemOption extends ContentMany {
	@Column()
	public systemSystemOptionId: string;

	@ManyToOne(() => SystemSystemOption, (systemSystemOption) => systemSystemOption.systemSystemSystemOptions, {
		onDelete: 'CASCADE'
	})
	public systemSystemOption: SystemSystemOption;

	@Column()
	public systemId: string;

	@ManyToOne(() => System, (system) => system.systemSystemSystemOptions)
	public system: System;
}
