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
import { ProviderProviderOptionController } from './provider-provider-option.controller';
import { ProviderProviderOptionService } from '../provider-provider-option.service';
import { ProviderProviderOption } from '../provider-provider-option.entity';
import { ProviderProviderProviderOption } from '../../provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderOption } from '../../provider-option/provider-option.entity';
import { Provider } from '../../provider/provider.entity';

@Module({
	controllers: [ ProviderProviderOptionController ],
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
		ProviderProviderOptionService, 
	],
})
export class ProviderProviderOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
