import { Test, TestingModule } from '@nestjs/testing';
import { ProviderProviderOptionHttpController } from './provider-provider-option-http.controller';

describe('ProviderProviderOptionHttpController', () => {
	let controller: ProviderProviderOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderProviderOptionHttpController],
		}).compile();

		controller = module.get<ProviderProviderOptionHttpController>(ProviderProviderOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
