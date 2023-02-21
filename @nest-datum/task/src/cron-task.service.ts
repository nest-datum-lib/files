import { Injectable } from '@nestjs/common';
import { TaskService } from './task.service';

@Injectable()
export class CronTaskService extends TaskService {
	protected type = 'cron';

	protected async takeOver(name: string, data): Promise<any> {
		(async () => {
			try {
				await this.processWrapper(new Date());
			}
			catch (err) {
				console.log(`Cron task "${this.constructor.name} error. [${err.message}]"`);
			}
		})();
		
		return this;
	}
}
