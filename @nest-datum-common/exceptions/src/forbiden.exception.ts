import { Exception } from './exception';

export class ForbidenException extends Exception {
	public readonly cmd: string = 'notification.create';
	public readonly errorCode: number = 403;
}