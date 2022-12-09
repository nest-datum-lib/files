import getCurrentLine from 'get-current-line';
import { Controller } from '@nestjs/common';
import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { BalancerService } from 'nest-datum/balancer/src';
import * as Validators from 'nest-datum/validators/src';
import { FileService } from './file.service';

@Controller()
export class FileController {
	constructor(
		private readonly fileService: FileService,
		private readonly balancerService: BalancerService,
	) {
	}

	@MessagePattern({ cmd: 'file.many' })
	async many(payload) {
		try {
			const many = await this.fileService.many({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_MANY'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				sort: Validators.obj('sort', payload['sort']),
				filter: Validators.obj('filter', payload['filter']),
				query: Validators.str('query', payload['query'], {
					min: 1,
					max: 255,
				}),
				page: Validators.int('page', payload['page'], {
					min: 1,
					default: 1,
				}),
				limit: Validators.int('limit', payload['limit'], {
					min: 1,
					default: 20,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@MessagePattern({ cmd: 'file.one' })
	async one(payload) {
		try {
			const output = await this.fileService.one({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_ONE'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('file.drop')
	async drop(payload) {
		try {
			await this.fileService.drop({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_DROP'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('file.dropMany')
	async dropMany(payload) {
		try {
			await this.fileService.dropMany({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_DROP_MANY'] ],
					isRequired: true,
				}),
				ids: Validators.arr('ids', payload['ids'], {
					isRequired: true,
					min: 1,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('file.create')
	async create(payload) {
		try {
			const output = await this.fileService.create({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				userId: Validators.id('userId', payload['userId']),
				systemId: Validators.id('systemId', payload['systemId'], {
					isRequired: true,
				}),
				parentId: Validators.id('parentId', payload['parentId']),
				path: Validators.path('path', payload['path'], {
					min: 1,
					max: 255,
				}),
				files: Validators.files('files', payload['files']),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('file.update')
	async update(payload) {
		try {
			await this.fileService.update({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FILES_FILE_UPDATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				newId: Validators.id('newId', payload['newId']),
				userId: Validators.id('userId', payload['userId']),
				systemId: Validators.id('systemId', payload['systemId']),
				parentId: Validators.id('parentId', payload['parentId']),
				path: Validators.path('path', payload['path'], {
					min: 1,
					max: 255,
				}),
				name: Validators.str('name', payload['name'], {
					min: 1,
					max: 255,
				}),
				description: Validators.str('description', payload['description'], {
					min: 1,
					max: 255,
				}),
				// type: Validators.str('type', payload['type'], {
				// 	min: 1,
				// 	max: 16,
				// }),
				// size: Validators.str('size', payload['size'], {
				// 	min: 1,
				// 	max: 16,
				// }),
				isNotDelete: Validators.bool('isNotDelete', payload['isNotDelete']),
				isDeleted: Validators.bool('isDeleted', payload['isDeleted']),
				createdAt: Validators.date('createdAt', payload['createdAt']),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}
}
