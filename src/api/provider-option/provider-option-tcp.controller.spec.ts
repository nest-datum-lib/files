import { Test, TestingModule } from '@nestjs/testing';
import { ProviderOptionTcpController } from './provider-option-tcp.controller';

describe('ProviderOptionTcpController', () => {
	let controller: ProviderOptionTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderOptionTcpController],
		}).compile();

		controller = module.get<ProviderOptionTcpController>(ProviderOptionTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
