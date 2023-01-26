import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisConfig } from 'config/redis';
import { typeormConfig } from 'config/typeorm';
import { BalancerModule } from 'nest-datum/balancer/src';
import { QueueModule } from 'nest-datum/queue/src';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { ProviderProviderProviderOption } from 'src/api/provider-provider-provider-option/provider-provider-provider-option.entity';
import { ProviderProviderOption } from 'src/api/provider-provider-option/provider-provider-option.entity';
import { SystemSystemSystemOption } from 'src/api/system-system-system-option/system-system-system-option.entity';
import { SystemSystemOption } from 'src/api/system-system-option/system-system-option.entity';
import { Folder } from 'src/api/folder/folder.entity';
import { File } from 'src/api/file/file.entity';
import { ProcessorService } from './processor.service';
import { DownloadProcessor } from './download.processor';

console.log('typeormConfig', typeormConfig);

@Module({
	controllers: [],
	imports: [
		TypeOrmModule.forRoot(typeormConfig),
		TypeOrmModule.forFeature([ 
			ProviderProviderProviderOption,
			ProviderProviderOption,
			SystemSystemSystemOption,
			SystemSystemOption,
			Folder,
			File, 
		]),
		ServeStaticModule.forRoot({ rootPath: process.env.APP_ROOT_PATH }),
		RedisModule.forRoot(redisConfig),
		BalancerModule,
		QueueModule,
	],
	providers: [ 
		BalancerRepository, 
		BalancerService,
		CacheService,
		ProcessorService, 
		DownloadProcessor,
	],
})
export class ProcessorModule {
}
