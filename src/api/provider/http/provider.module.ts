import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
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
import { ProviderController } from './provider.controller';
import { ProviderService } from '../provider.service';
import { Provider } from '../provider.entity';
import { ProviderProviderProviderOption } from '../../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../../provider-option/provider-option.entity';
import { System } from '../../system/system.entity';
import { ProviderProviderOption } from '../../provider-provider-option/provider-provider-option.entity';
import { ProviderProviderOptionModule } from '../../provider-provider-option/provider-provider-option.module';
import { ProviderProviderOptionService } from '../../provider-provider-option/provider-provider-option.service';
import { ProviderOptionModule } from '../../provider-option/provider-option.module';
import { ProviderOptionService } from '../../provider-option/provider-option.service';

@Module({
	controllers: [ ProviderController ],
	imports: [
		TypeOrmModule.forFeature([ 
			System,
			ProviderOption,
			ProviderProviderOption,
			Provider,
			ProviderProviderProviderOption, 
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
		ProviderProviderOptionModule,
		ProviderOptionModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		ProviderProviderOptionService,
		ProviderOptionService, 
		ProviderService,
	],
})
export class ProviderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
