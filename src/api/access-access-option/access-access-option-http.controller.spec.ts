import { Test, TestingModule } from '@nestjs/testing';
import { AccessAccessOptionHttpController } from './access-access-option-http.controller';

describe('AccessAccessOptionHttpController', () => {
	let controller: AccessAccessOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccessAccessOptionHttpController],
		}).compile();

		controller = module.get<AccessAccessOptionHttpController>(AccessAccessOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
