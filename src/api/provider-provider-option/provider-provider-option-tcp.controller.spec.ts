import { Test, TestingModule } from '@nestjs/testing';
import { ProviderProviderOptionTcpController } from './provider-provider-option-tcp.controller';

describe('ProviderProviderOptionTcpController', () => {
	let controller: ProviderProviderOptionTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderProviderOptionTcpController],
		}).compile();

		controller = module.get<ProviderProviderOptionTcpController>(ProviderProviderOptionTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
