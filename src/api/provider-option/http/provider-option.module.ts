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
import { ProviderOptionController } from './provider-option.controller';
import { ProviderOptionService } from '../provider-option.service';
import { ProviderOption } from '../provider-option.entity';
import { ProviderProviderProviderOption } from '../../provider-provider-provider-option/provider-provider-provider-option.entity';
import { Provider } from '../../provider/provider.entity';
import { ProviderProviderOption } from '../../provider-provider-option/provider-provider-option.entity';

@Module({
	controllers: [ ProviderOptionController ],
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
export class ProviderOptionModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}