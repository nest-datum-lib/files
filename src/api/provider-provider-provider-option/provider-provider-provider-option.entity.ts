import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { Many } from '@nest-datum/many';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderProviderOption extends Many {
	@Column()
	public providerProviderOptionId: string;

	@ManyToOne(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.providerProviderProviderOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public providerProviderOption: ProviderProviderOption;

	@Column()
	public providerId: string;

	@ManyToOne(() => Provider, (provider) => provider.providerProviderProviderOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public provider: Provider;
}
