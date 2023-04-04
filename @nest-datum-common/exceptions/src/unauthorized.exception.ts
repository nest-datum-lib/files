import { Exception } from './exception';

export class UnauthorizedException extends Exception {
	public readonly cmd: string = 'notification.create';
	public readonly errorCode: number = 401;
}