import { Test, TestingModule } from '@nestjs/testing';
import { ProviderStatusHttpController } from './provider-status-http.controller';

describe('ProviderStatusHttpController', () => {
	let controller: ProviderStatusHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderStatusHttpController],
		}).compile();

		controller = module.get<ProviderStatusHttpController>(ProviderStatusHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
