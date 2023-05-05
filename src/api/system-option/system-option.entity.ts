import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option } from '@nest-datum/option';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';

@Entity()
export class SystemOption extends Option {
	@OneToMany(() => SystemSystemOption, (systemSystemOption) => systemSystemOption.systemOption, {
		cascade: true,
	})
	public systemSystemOptions: SystemSystemOption[];
}
