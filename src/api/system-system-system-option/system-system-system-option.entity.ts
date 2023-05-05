import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { Many } from '@nest-datum/many';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemSystemOption extends Many {
	@Column()
	public systemSystemOptionId: string;

	@ManyToOne(() => SystemSystemOption, (systemSystemOption) => systemSystemOption.systemSystemSystemOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public systemSystemOption: SystemSystemOption;

	@Column()
	public systemId: string;

	@ManyToOne(() => System, (system) => system.systemSystemSystemOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public system: System;
}
