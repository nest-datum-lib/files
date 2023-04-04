import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { ProviderOptionService } from './provider-option.service';
import { ProviderOptionTcpController } from './provider-option-tcp.controller';
import { ProviderProviderProviderOption } from '../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Provider } from '../provider/provider.entity';
import { ProviderProviderOption } from '../provider-provider-option/provider-provider-option.entity';
import { ProviderOption } from './provider-option.entity';

@Module({
	controllers: [ ProviderOptionTcpController ],
	imports: [
		TypeOrmModule.forFeature([
			ProviderOption,
			ProviderProviderOption,
			Provider,
			ProviderProviderProviderOption,
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		ProviderOptionService, 
	],
})
export class ProviderOptionTcpModule {
}

