import { Test, TestingModule } from '@nestjs/testing';
import { ProviderHttpController } from './provider-http.controller';

describe('ProviderHttpController', () => {
	let controller: ProviderHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderHttpController],
		}).compile();

		controller = module.get<ProviderHttpController>(ProviderHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
