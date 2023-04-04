import { 
	Entity,
	Column, 
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Bind } from '@nest-datum/bind';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderProviderOption extends Bind {
	@Column()
	public providerOptionId: string;

	@ManyToOne(() => ProviderOption, (providerOption) => providerOption.providerProviderOptions)
	public providerOption: ProviderOption;

	@Column()
	public providerId: string;

	@ManyToOne(() => Provider, (provider) => provider.providerProviderOptions)
	public provider: Provider;

	@OneToMany(() => ProviderProviderProviderOption, (providerProviderProviderOption) => providerProviderProviderOption.providerProviderOption)
	public providerProviderProviderOptions: ProviderProviderProviderOption[];
}
