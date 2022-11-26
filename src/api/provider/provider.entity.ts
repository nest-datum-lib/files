import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { ProviderStatus } from '../provider-status/provider-status.entity';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class Provider {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public providerStatusId: string;

	@ManyToOne(() => ProviderStatus, (providerStatus) => providerStatus.providers)
	public providerStatus: ProviderStatus;

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

	@OneToMany(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.provider)
	public providerProviderOptions: ProviderProviderOption[];

	@OneToMany(() => ProviderProviderProviderOption, (providerProviderProviderOption) => providerProviderProviderOption.provider)
	public providerProviderProviderOptions: ProviderProviderProviderOption[];

	@OneToMany(() => System, (system) => system.provider)
	public systems: System[];
}
