import { Test, TestingModule } from '@nestjs/testing';
import { ProviderOptionHttpController } from './provider-option-http.controller';

describe('ProviderOptionHttpController', () => {
	let controller: ProviderOptionHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderOptionHttpController],
		}).compile();

		controller = module.get<ProviderOptionHttpController>(ProviderOptionHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
