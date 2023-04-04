import { Test, TestingModule } from '@nestjs/testing';
import { AccessStatusHttpController } from './access-status-http.controller';

describe('AccessStatusHttpController', () => {
	let controller: AccessStatusHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccessStatusHttpController],
		}).compile();

		controller = module.get<AccessStatusHttpController>(AccessStatusHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
