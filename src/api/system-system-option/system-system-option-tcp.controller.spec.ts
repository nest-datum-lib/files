import { Test, TestingModule } from '@nestjs/testing';
import { SystemSystemOptionTcpController } from './system-system-option-tcp.controller';

describe('SystemSystemOptionTcpController', () => {
	let controller: SystemSystemOptionTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemSystemOptionTcpController],
		}).compile();

		controller = module.get<SystemSystemOptionTcpController>(SystemSystemOptionTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
