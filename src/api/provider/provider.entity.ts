import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
	OneToMany,
} from 'typeorm';
import {
	IsEmail,
} from 'class-validator';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { System } from '../system/system.entity';

@Entity()
export class Provider {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	@Index()
	public userId: string;

	@Column({ default: '' })
	public providerStatusId: string;

	@Column({ default: '' })
	public envKey: string;

	@Column()
	@Index({ unique: true })
	public name: string;

	@Column({ default: '' })
	@Index()
	public description: string;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

	@Column('boolean', { default: false })
	public isNotDelete: boolean = false;

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

	@OneToMany(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.provider, {
		cascade: true,
	})
	public providerProviderOptions: ProviderProviderOption[];

	@OneToMany(() => ProviderProviderProviderOption, (providerProviderProviderOption) => providerProviderProviderOption.provider, {
		cascade: true,
	})
	public providerProviderProviderOptions: ProviderProviderProviderOption[];

	@OneToMany(() => System, (system) => system.provider, {
		cascade: true,
	})
	public systems: System[];
}
