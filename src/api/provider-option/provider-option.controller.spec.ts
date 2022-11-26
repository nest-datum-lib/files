import { Test, TestingModule } from '@nestjs/testing';
import { ProviderOptionController } from './provider-option.controller';

describe('ProviderOptionController', () => {
	let controller: ProviderOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderOptionController],
		}).compile();

		controller = module.get<ProviderOptionController>(ProviderOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
