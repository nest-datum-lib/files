import { Test, TestingModule } from '@nestjs/testing';
import { SystemSystemOptionController } from './system-system-option.controller';

describe('SystemSystemOptionController', () => {
	let controller: SystemSystemOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemSystemOptionController],
		}).compile();

		controller = module.get<SystemSystemOptionController>(SystemSystemOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
