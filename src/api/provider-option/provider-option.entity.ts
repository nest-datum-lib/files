import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option as NestDatumOption } from '@nest-datum/option';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';

@Entity()
export class ProviderOption extends NestDatumOption {
	@OneToMany(() => ProviderProviderOption, (providerProviderOption) => providerProviderOption.providerOption)
	public providerProviderOptions: ProviderProviderOption[];
}
