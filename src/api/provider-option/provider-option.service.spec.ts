import { Test, TestingModule } from '@nestjs/testing';
import { ProviderOptionService } from './provider-option.service';

describe('ProviderOptionService', () => {
	let service: ProviderOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProviderOptionService],
		}).compile();

		service = module.get<ProviderOptionService>(ProviderOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
