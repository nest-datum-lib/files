import { Test, TestingModule } from '@nestjs/testing';
import { SystemHttpController } from './system-http.controller';

describe('SystemHttpController', () => {
	let controller: SystemHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemHttpController],
		}).compile();

		controller = module.get<SystemHttpController>(SystemHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
