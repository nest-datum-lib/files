import { Test, TestingModule } from '@nestjs/testing';
import { SystemTcpController } from './system-tcp.controller';

describe('SystemTcpController', () => {
	let controller: SystemTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SystemTcpController],
		}).compile();

		controller = module.get<SystemTcpController>(SystemTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
