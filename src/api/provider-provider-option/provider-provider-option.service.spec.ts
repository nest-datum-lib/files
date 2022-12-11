import { Test, TestingModule } from '@nestjs/testing';
import { ProviderProviderOptionService } from './provider-provider-option.service';

describe('ProviderProviderOptionService', () => {
	let service: ProviderProviderOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProviderProviderOptionService],
		}).compile();

		service = module.get<ProviderProviderOptionService>(ProviderProviderOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
