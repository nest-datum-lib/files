import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ReplicaService } from '@nest-datum/replica';
import { RedisService } from '@nest-datum/redis';
import { 
	TaskService,
	LoopService, 
} from '@nest-datum/queue';

@Injectable()
export class DownloadTask extends TaskService {
	public delay = 800;

	constructor(
		@InjectRedis(process['REDIS_QUEUE']) protected redisService: Redis,
		protected replicaService: ReplicaService,
		protected loopService: LoopService,
	) {
		super();
	}

	async process(taskData: object, timestamp?: Date): Promise<any> {
		return taskData;
	}
}
