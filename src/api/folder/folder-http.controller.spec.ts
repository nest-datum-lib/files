import { Test, TestingModule } from '@nestjs/testing';
import { FolderHttpController } from './folder-http.controller';

describe('FolderHttpController', () => {
	let controller: FolderHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FolderHttpController],
		}).compile();

		controller = module.get<FolderHttpController>(FolderHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
