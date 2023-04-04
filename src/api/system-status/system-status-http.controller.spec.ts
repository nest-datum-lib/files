import { Test, TestingModule } from '@nestjs/testing';
import { SystemStatusHttpController } from './system-status-http.controller';

describe('SystemStatusHttpController', () => {
	let controller: SystemStatusHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemStatusHttpController],
		}).compile();

		controller = module.get<SystemStatusHttpController>(SystemStatusHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
