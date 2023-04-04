import { Test, TestingModule } from '@nestjs/testing';
import { ProviderTcpController } from './provider-tcp.controller';

describe('ProviderTcpController', () => {
	let controller: ProviderTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderTcpController],
		}).compile();

		controller = module.get<ProviderTcpController>(ProviderTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
