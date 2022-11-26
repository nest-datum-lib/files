import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class SystemSystemSystemOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public parentId: string;

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

	@Column('text')
	public content: string;

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
}
