import { Test, TestingModule } from '@nestjs/testing';
import { SystemOptionController } from './system-option.controller';

describe('SystemOptionController', () => {
	let controller: SystemOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemOptionController],
		}).compile();

		controller = module.get<SystemOptionController>(SystemOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
