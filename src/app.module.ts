import { RedisModule } from '@liaoliaots/nestjs-redis';
import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
	RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { typeormConfig } from 'config/typeorm';
import { redisConfig } from 'config/redis';
import { BalancerModule } from 'nest-datum/balancer/src'
import { TokenMiddleware } from './token.middleware';
import { TrafficMiddleware } from './traffic.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderStatusModule } from './api/provider-status/provider-status.module';
import { ProviderOptionModule } from './api/provider-option/provider-option.module';
import { ProviderProviderOptionModule } from './api/provider-provider-option/provider-provider-option.module';
import { ProviderProviderProviderOptionModule } from './api/provider-provider-provider-option/provider-provider-provider-option.module';
import { ProviderModule } from './api/provider/provider.module';
import { SystemStatusModule } from './api/system-status/system-status.module';
import { SystemOptionModule } from './api/system-option/system-option.module';
import { SystemSystemOptionModule } from './api/system-system-option/system-system-option.module';
import { SystemSystemSystemOptionModule } from './api/system-system-system-option/system-system-system-option.module';
import { SystemModule } from './api/system/system.module';
import { FolderModule } from './api/folder/folder.module';
import { FileModule } from './api/file/file.module';
import { SettingModule } from './api/setting/setting.module';
import { ProviderStatusModule as HttpProviderStatusModule } from './http/provider-status.module';
import { ProviderOptionModule as HttpProviderOptionModule } from './http/provider-option.module';
import { ProviderModule as HttpProviderModule } from './http/provider.module';
import { SystemStatusModule as HttpSystemStatusModule } from './http/system-status.module';
import { SystemOptionModule as HttpSystemOptionModule } from './http/system-option.module';
import { SystemModule as HttpSystemModule } from './http/system.module';
import { FolderModule as HttpFolderModule } from './http/folder.module';
import { FileModule as HttpFileModule } from './http/file.module';
import { SettingModule as HttpSettingModule } from './http/setting.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: process.env.APP_ROOT_PATH }),
		TypeOrmModule.forRoot(typeormConfig),
		RedisModule.forRoot(redisConfig),
		BalancerModule,
		SettingModule,
		ProviderStatusModule,
		ProviderOptionModule,
		ProviderProviderOptionModule,
		ProviderProviderProviderOptionModule,
		ProviderModule,
		SystemStatusModule,
		SystemOptionModule,
		SystemSystemOptionModule,
		SystemSystemSystemOptionModule,
		SystemModule,
		FolderModule,
		FileModule,

		//http
		HttpProviderStatusModule,
		HttpProviderOptionModule,
		HttpProviderModule,
		HttpSystemStatusModule,
		HttpSystemOptionModule,
		HttpSystemModule,
		HttpFolderModule,
		HttpFileModule,
		HttpSettingModule,
	],
	controllers: [ AppController ],
	providers: [ 
		AppService, 
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				TokenMiddleware,
				TrafficMiddleware,
			)
			.forRoutes({
				path: `*`,
				method: RequestMethod.ALL,
			});
	}
}
