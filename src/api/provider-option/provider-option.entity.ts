import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option } from '@nest-datum/option';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';

@Entity()
export class ProviderOption extends Option {
	@OneToMany(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.providerOption)
	public providerProviderOptions: ProviderProviderOption[];
}
