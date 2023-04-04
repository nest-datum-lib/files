import { Test, TestingModule } from '@nestjs/testing';
import { SystemStatusTcpController } from './system-status-tcp.controller';

describe('SystemStatusTcpController', () => {
	let controller: SystemStatusTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemStatusTcpController],
		}).compile();

		controller = module.get<SystemStatusTcpController>(SystemStatusTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
