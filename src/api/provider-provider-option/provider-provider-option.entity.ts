import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public providerOptionId: string;

	@ManyToOne(() => ProviderOption, (providerOption) => providerOption.providerProviderOptions)
	public providerOption: ProviderOption;

	@Column()
	public providerId: string;

	@ManyToOne(() => Provider, (provider) => provider.providerProviderOptions)
	public provider: Provider;

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

	@OneToMany(() => ProviderProviderProviderOption, (providerProviderProviderOption) => providerProviderProviderOption.providerProviderOption)
	public providerProviderProviderOptions: ProviderProviderProviderOption[];
}
