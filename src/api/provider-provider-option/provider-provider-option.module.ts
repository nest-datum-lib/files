import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../provider-option/provider-option.entity';
import { Provider } from '../provider/provider.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ ProviderProviderProviderOption ]),
		TypeOrmModule.forFeature([ ProviderOption ]),
		TypeOrmModule.forFeature([ Provider ]),
	],
})
export class ProviderProviderOptionModule {
}

