import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemOption } from '../system-option/system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public systemOptionId: string;

	@ManyToOne(() => SystemOption, (systemOption) => systemOption.systemSystemOptions)
	public systemOption: SystemOption;

	@Column()
	public systemId: string;

	@ManyToOne(() => System, (system) => system.systemSystemOptions)
	public system: System;

	@CreateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP', 
	})
	public createdAt: Date;

	@UpdateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP', 
	})
	public updatedAt: Date;

	@OneToMany(() => SystemSystemSystemOption, (systemSystemSystemOption) => systemSystemSystemOption.systemSystemOption)
	public systemSystemSystemOptions: SystemSystemSystemOption[];
}
