import { 
	Injectable, 
	NestMiddleware, 
} from '@nestjs/common';
import { 
	Request, 
	Response, 
	NextFunction, 
} from 'express';
import { BalancerService } from 'nest-datum/balancer/src';
import { TrafficException } from 'nest-datum/exceptions';

@Injectable()
export class TrafficMiddleware implements NestMiddleware {
	constructor(
		private readonly balancerService: BalancerService,
	) {
	}

	use(req: Request, res: Response, next: NextFunction) {
		try {
			const host = req.get('Host');
			const referrer = (req['headers'] || {})['referrer'] 
				|| (req['headers'] || {})
				|| req.get('Referrer');
			const ip = req.headers['x-forwarded-for'] 
				|| req.socket.remoteAddress;
			const originalUrl = (req['originalUrl'] || '')
				.split('?')
				.shift();
			const method = req['method'];
			const headers = req['headers'];
			const body = req['body'];
			const queries = req['query'];
			const param = req['params'];
			const referrerStr = (referrer
				&& typeof referrer === 'object'
				&& referrer['host'])
				? referrer['host']
				: referrer;

			this.balancerService.log(new TrafficException(`TrafficMiddleware - ${referrerStr}`, {}, {
				host,
				referrer: referrerStr,
				ip,
				originalUrl,
				method,
				headers,
				body,
				queries,
				param,
			}));
		}
		catch (err) {
			console.error(`Log emit creation.`);
		}
		next();
	}
}