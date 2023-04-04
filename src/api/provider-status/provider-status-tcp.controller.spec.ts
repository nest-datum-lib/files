import { Test, TestingModule } from '@nestjs/testing';
import { ProviderStatusTcpController } from './provider-status-tcp.controller';

describe('ProviderStatusTcpController', () => {
	let controller: ProviderStatusTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderStatusTcpController],
		}).compile();

		controller = module.get<ProviderStatusTcpController>(ProviderStatusTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
