import { Controller as NestjsController } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { SqlService } from '@nest-datum/sql';
import { TransportService } from '../../../@nest-datum/transport/src';
import {
	func as utilsCheckFunc,
	obj as utilsCheckObj,
	exists as utilsCheckExists,
	bool as utilsCheckBool,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	strDescription as utilsCheckStrDescription,
	strRegex as utilsCheckStrRegex,
	strDataType as utilsCheckStrDataType,
	numericInt as utilsCheckNumericInt,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';

interface ControllerInterface {
	transportService: TransportService;
}

@NestjsController()
export class Controller implements ControllerInterface {
	public transportService;
	public service;

	async validateMany(options: object = {}) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		try {
			options['select'] = JSON.parse(options['select']);
		}
		catch (err) {
		}
		try {
			options['relations'] = JSON.parse(options['relations']);
		}
		catch (err) {
		}
		try {
			options['sort'] = JSON.parse(options['sort']);
		}
		catch (err) {
		}
		try {
			options['filter'] = JSON.parse(options['filter']);
		}
		catch (err) {
		}
		return {
			user,
			...utilsCheckNumericInt(options['page'])
				? { page: Number(options['page'] || 1) }
				: { page: 1 },
			...utilsCheckNumericInt(options['limit'])
				? { limit: Number(options['limit'] || 20) }
				: { limit: 20 },
			...utilsCheckObj(options['select']) 
				? { select: options['select'] } 
				: {},
			...utilsCheckObj(options['relations']) 
				? { relations: options['relations'] } 
				: {},
			...utilsCheckObj(options['sort']) 
				? { sort: options['sort'] } 
				: {},
			...utilsCheckObj(options['filter']) 
				? { filter: options['filter'] } 
				: {},
			...utilsCheckStrDescription(options['query']) 
				? { query: options['query'] } 
				: {},
		};
	}

	async validateOne(options: object = {}) {
		if (!utilsCheckStrId(options['id'])) {
			throw new WarningException(`Property "id" is not valid.`);
		}
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		try {
			options['select'] = JSON.parse(options['select']);
		}
		catch (err) {
		}
		try {
			options['relations'] = JSON.parse(options['relations']);
		}
		catch (err) {
		}
		return {
			user,
			id: options['id'],
			...utilsCheckObj(options['select']) 
				? { select: options['select'] } 
				: {},
			...utilsCheckObj(options['relations']) 
				? { relations: options['relations'] } 
				: {},
		};
	}

	async validateDrop(options: object = {}) {
		if (!utilsCheckStrId(options['id'])) {
			throw new WarningException(`Property "id" is not valid.`);
		}
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		return {
			user,
			id: options['id'],
		};
	}

	async validateDropMany(options: object = {}) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		return {
			user,
			ids: JSON.parse(options['ids']),
		};
	}

	async validateOptions(options: object = {}) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options['id'])) {
			throw new WarningException(`Property "id" is nt valid.`);
		}
		try {
			options['data'] = JSON.parse(options['data']);
		}
		catch (err) {
		}
		if (!utilsCheckArr(options['data'])) {
			throw new WarningException(`Property "data" is nt valid.`);
		}

		return {
			userId: user['id'],
			id: options['id'],
			data: options['data'],
		};
	}

	async validateCreate(options) {
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);
		const data = {
			description: '',
			regex: '',
		};

		if (!user) {
			throw new WarningException(`User is undefined or token is not valid.`);
		}
		delete options['user'];

		if (options['id'] && utilsCheckStrId(options['id'])) {
			data['id'] = options['id'];
			delete options['id'];
		}
		if (options['newId'] && utilsCheckStrId(options['newId'])) {
			data['newId'] = options['newId'];
			delete options['newId'];
		}
		if (options['name'] && utilsCheckStrName(options['name'])) {
			data['name'] = options['name'];
			delete options['name'];
		}
		if (options['dataTypeId'] && utilsCheckStrDataType(options['dataTypeId'])) {
			data['dataTypeId'] = options['dataTypeId'];
			delete options['dataTypeId'];
		}
		if (utilsCheckStrDescription(options['description'])) {
			data['description'] = options['description'];
			delete options['description'];
		}
		if (utilsCheckStrRegex(options['regex'])) {
			data['regex'] = options['regex'];
			delete options['regex'];
		}
		if (utilsCheckExists(options['isRequired']) && utilsCheckBool(options['isRequired'])) {
			data['isRequired'] = options['isRequired'];
			delete options['isRequired'];
		}
		if (utilsCheckExists(options['isMultiline']) && utilsCheckBool(options['isMultiline'])) {
			data['isMultiline'] = options['isMultiline'];
			delete options['isMultiline'];
		}
		if (utilsCheckExists(options['isNotDelete']) && utilsCheckBool(options['isNotDelete'])) {
			data['isNotDelete'] = options['isNotDelete'];
			delete options['isNotDelete'];
		}
		if (utilsCheckExists(options['isDeleted']) && utilsCheckBool(options['isDeleted'])) {
			data['isDeleted'] = options['isDeleted'];
			delete options['isDeleted'];
		}

		return {
			userId: user['id'],
			...options,
			...data,
		};
	}

	async log(err) {
		if (!utilsCheckObj(err)
			|| !utilsCheckStrName(err['cmd'])
			|| !utilsCheckFunc(err['getCmd'])
			|| !utilsCheckFunc(err['options'])) {
			console.error(err);
			return;
		}
		this.transportService.sendLog(err);
	}

	async serviceHandlerWrapperDefault() {
	}

	async serviceHandlerWrapper(callback = () => {}) {
		try {
			const output = callback
				? (await callback())
				: (await this.serviceHandlerWrapperDefault());

			this.transportService.decrementLoadingIndicator();

			return output;
		}
		catch (err) {
			this.log(err);
			this.transportService.decrementLoadingIndicator();

			return err;
		}
	}
}
