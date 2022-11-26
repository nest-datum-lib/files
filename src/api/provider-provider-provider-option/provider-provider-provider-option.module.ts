import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ ProviderProviderOption ]),
		TypeOrmModule.forFeature([ Provider ]),
	],
})
export class ProviderProviderProviderOptionModule {
}
