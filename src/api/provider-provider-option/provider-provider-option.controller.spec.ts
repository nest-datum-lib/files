import { Test, TestingModule } from '@nestjs/testing';
import { ProviderProviderOptionController } from './provider-provider-option.controller';

describe('ProviderProviderOptionController', () => {
	let controller: ProviderProviderOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderProviderOptionController],
		}).compile();

		controller = module.get<ProviderProviderOptionController>(ProviderProviderOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
