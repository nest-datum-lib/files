import { Test, TestingModule } from '@nestjs/testing';
import { FileHttpController } from './file-http.controller';

describe('FileHttpController', () => {
	let controller: FileHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FileHttpController],
		}).compile();

		controller = module.get<FileHttpController>(FileHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
