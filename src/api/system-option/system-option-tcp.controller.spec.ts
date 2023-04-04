import { Test, TestingModule } from '@nestjs/testing';
import { SystemOptionTcpController } from './system-option-tcp.controller';

describe('SystemOptionTcpController', () => {
	let controller: SystemOptionTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemOptionTcpController],
		}).compile();

		controller = module.get<SystemOptionTcpController>(SystemOptionTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
