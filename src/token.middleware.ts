import getCurrentLine from 'get-current-line';
import { 
	Injectable, 
	NestMiddleware, 
	HttpException,
	HttpStatus, 
} from '@nestjs/common';
import { 
	Request, 
	Response, 
	NextFunction, 
} from 'express';
import { WarningException } from '@nest-datum/exceptions';
import { checkToken } from '@nest-datum/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const accessToken = req['headers']['access-token']
			?? req['query']['accessToken']
			?? req['body']['accessToken'];

		try {
			const payload = JSON.parse(Buffer.from((accessToken.split('.'))[1], 'base64').toString());

			if (!checkToken(accessToken, process.env.JWT_SECRET_ACCESS_KEY, {
				...payload,
				exp: process.env.JWT_ACCESS_TIMEOUT,
			})) {
				new WarningException('Token is not valid.', getCurrentLine(), { accessToken });
				throw new HttpException('Token is not valid.', HttpStatus.UNAUTHORIZED);
			}
			if ((Date.now() - Number(process.env.JWT_ACCESS_TIMEOUT)) > Number(payload.iat)) {
				new WarningException('Token is old.', getCurrentLine(), { accessToken });
				throw new HttpException('Token is old.', HttpStatus.UNAUTHORIZED);
			}
			next();
		}
		catch (err) {
			new WarningException('Token is not valid.', getCurrentLine(), { accessToken });
			throw new HttpException('Token is not valid.', HttpStatus.UNAUTHORIZED);
		}
	}
}