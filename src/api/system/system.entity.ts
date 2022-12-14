import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { SystemStatus } from '../system-status/system-status.entity';
import { SystemSystemSystemOption } from '../system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';
import { Provider } from '../provider/provider.entity';
import { Folder } from '../folder/folder.entity';
import { File } from '../file/file.entity';

@Entity()
export class System {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public providerId: string;

	@ManyToOne(() => Provider, (provider) => provider.systems, { onDelete: 'CASCADE' })
	public provider: Provider;

	@Column({ default: '' })
	public systemStatusId: string;

	@ManyToOne(() => SystemStatus, (systemStatus) => systemStatus.systems)
	public systemStatus: SystemStatus;

	@Column()
	public name: string;

	@Column({ default: '' })
	public description: string;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

	@Column('boolean', { default: false })
	public isNotDelete: boolean;

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

	@OneToMany(() => SystemSystemOption, (systemSystemOption) => systemSystemOption.system)
	public systemSystemOptions: SystemSystemOption[];

	@OneToMany(() => SystemSystemSystemOption, (systemSystemSystemOption) => systemSystemSystemOption.system)
	public systemSystemSystemOptions: SystemSystemSystemOption[];

	@OneToMany(() => Folder, (folder) => folder.system)
	public folders: Folder[];

	@OneToMany(() => File, (file) => file.system)
	public files: File[];
}
