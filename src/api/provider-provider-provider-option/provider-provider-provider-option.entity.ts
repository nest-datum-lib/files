import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderProviderOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public parentId: string;

	@Column()
	public providerProviderOptionId: string;

	@ManyToOne(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.providerProviderProviderOptions, {
		onDelete: 'CASCADE'
	})
	public providerProviderOption: ProviderProviderOption;

	@Column()
	public providerId: string;

	@ManyToOne(() => Provider, (provider) => provider.providerProviderProviderOptions)
	public provider: Provider;

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
