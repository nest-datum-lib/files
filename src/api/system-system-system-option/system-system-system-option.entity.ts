import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { OptionOptionOption as NestDatumOptionOptionOption } from '@nest-datum/option';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemSystemOption extends NestDatumOptionOptionOption {
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
