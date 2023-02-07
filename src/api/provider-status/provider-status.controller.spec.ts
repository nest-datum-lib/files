import { Test, TestingModule } from '@nestjs/testing';
import { ProviderStatusController } from './provider-status.controller';

describe('ProviderStatusController', () => {
	let controller: ProviderStatusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderStatusController],
		}).compile();

		controller = module.get<ProviderStatusController>(ProviderStatusController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
