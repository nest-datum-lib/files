import { Test, TestingModule } from '@nestjs/testing';
import { SystemOptionHttpController } from './system-option-http.controller';

describe('SystemOptionHttpController', () => {
	let controller: SystemOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemOptionHttpController],
		}).compile();

		controller = module.get<SystemOptionHttpController>(SystemOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
