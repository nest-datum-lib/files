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
import { ProviderProviderOption } from '../../provider-provider-option/provider-provider-option.entity';
import { System } from '../../system/system.entity';

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
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		ProviderService, 
	],
})
export class ProviderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
