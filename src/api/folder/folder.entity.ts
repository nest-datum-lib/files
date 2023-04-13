import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
	Index,
} from 'typeorm';
import { File } from '../file/file.entity';
import { System } from '../system/system.entity';

@Entity()
export class Folder {
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
	@Index()
	public parentId: string;

	@Column({ unique: true })
	public path: string;

	@Column()
	@Index()
	public name: string;

	@Column({ default: '' })
	@Index()
	public description: string;

	@Column({ default: 'folder' })
	public type: string;

	@Column({ default: 0 })
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

	@OneToMany(() => File, (file) => file.parent)
	public files: File[];
}
