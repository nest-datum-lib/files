import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { OptionOptionOption as NestDatumOptionOptionOption } from '@nest-datum/option';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderProviderOption extends NestDatumOptionOptionOption {
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
