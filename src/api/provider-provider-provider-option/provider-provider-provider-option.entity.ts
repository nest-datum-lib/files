import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { ContentMany } from '@nest-datum/many';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderProviderOption extends ContentMany {
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
}
