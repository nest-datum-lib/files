import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { sqlConfig as utilsFormatSqlConfig } from '@nest-datum-utils/format';
import { AppController } from './app.controller';
import { 
	Http as HttpModules,
	Tcp as TcpModules, 
} from './index';

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: process.env.PATH_ROOT }),
		TypeOrmModule.forRoot(utilsFormatSqlConfig()),
		RedisModule.forRoot({
			config: [{
				namespace: 'Transport',
				host: process.env.REDIS_TRANSPORT_HOST,
				port: Number(process.env.REDIS_TRANSPORT_PORT),
				password: process.env.REDIS_TRANSPORT_PASSWORD,
				db: Number(process.env.REDIS_TRANSPORT_DB),
			}, {
				namespace: 'Cache',
				host: process.env.REDIS_CACHE_HOST,
				port: Number(process.env.REDIS_CACHE_PORT),
				password: process.env.REDIS_CACHE_PASSWORD,
				db: Number(process.env.REDIS_CACHE_DB),
			}, {
				namespace: 'Queue',
				host: process.env.REDIS_QUEUE_HOST,
				port: Number(process.env.REDIS_QUEUE_PORT),
				password: process.env.REDIS_QUEUE_PASSWORD,
				db: Number(process.env.REDIS_QUEUE_DB),
			}],
		}),
		
		...Object.keys(HttpModules).map((key) => HttpModules[key]),
		...Object.keys(TcpModules).map((key) => TcpModules[key]),
	],
	controllers: [ AppController ],
	providers: [],
})
export class AppModule {
}
