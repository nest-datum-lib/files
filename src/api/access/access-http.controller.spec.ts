import { Test, TestingModule } from '@nestjs/testing';
import { AccessHttpController } from './access-http.controller';

describe('AccessHttpController', () => {
	let controller: AccessHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccessHttpController],
		}).compile();

		controller = module.get<AccessHttpController>(AccessHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
