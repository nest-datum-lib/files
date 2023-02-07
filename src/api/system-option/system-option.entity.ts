import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option as NestDatumOption } from '@nest-datum/option';
import { SystemSystemOption } from '../system-system-option/system-system-option.entity';

@Entity()
export class SystemOption extends NestDatumOption {
	@OneToMany(() => SystemSystemOption, (systemSystemOption) => systemSystemOption.systemOption)
	public systemSystemOptions: SystemSystemOption[];
}
