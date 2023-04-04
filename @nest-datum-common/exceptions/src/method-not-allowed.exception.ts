import { Exception } from './exception';

export class MethodNotAllowedException extends Exception {
	public readonly cmd: string = 'notAllowed.create';
	public readonly errorCode: number = 405;
}