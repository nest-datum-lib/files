import { Test, TestingModule } from '@nestjs/testing';
import { SystemSystemOptionHttpController } from './system-system-option-http.controller';

describe('SystemSystemOptionHttpController', () => {
	let controller: SystemSystemOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemSystemOptionHttpController],
		}).compile();

		controller = module.get<SystemSystemOptionHttpController>(SystemSystemOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
