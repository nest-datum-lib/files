import { Test, TestingModule } from '@nestjs/testing';
import { AccessOptionHttpController } from './access-option-http.controller';

describe('AccessOptionHttpController', () => {
	let controller: AccessOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccessOptionHttpController],
		}).compile();

		controller = module.get<AccessOptionHttpController>(AccessOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
