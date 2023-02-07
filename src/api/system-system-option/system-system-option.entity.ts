import { 
	Entity,
	Column, 
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { OptionOption as NestDatumOptionOption } from '@nest-datum/option';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemOption extends NestDatumOptionOption {
	@Column()
	public systemOptionId: string;

	@ManyToOne(() => SystemOption, (systemOption) => systemOption.systemSystemOptions)
	public systemOption: SystemOption;

	@Column()
	public systemId: string;

	@ManyToOne(() => System, (system) => system.systemSystemOptions)
	public system: System;

	@OneToMany(() => SystemSystemSystemOption, (systemSystemSystemOption) => systemSystemSystemOption.systemSystemOption)
	public systemSystemSystemOptions: SystemSystemSystemOption[];
}
