import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Index,
} from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { System } from '../system/system.entity';

@Entity()
export class File {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	@Index()
	public userId: string;

	@Column({ default: '' })
	public systemId: string;

	@ManyToOne(() => System, (system) => system.files, { onDelete: 'CASCADE' })
	public system: System;

	@Column({ default: '' })
	public parentId: string;

	@ManyToOne(() => Folder, (parent) => parent.files, { onDelete: 'CASCADE' })
	public parent: Folder;

	@Column({ unique: true })
	public path: string;

	@Column()
	@Index()
	public name: string;

	@Column({ default: '' })
	@Index()
	public description: string;

	@Column()
	public type: string;

	@Column()
	public size: number;

	@Column('boolean', { default: false })
	public isNotDelete: boolean = false;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

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
