import { Test, TestingModule } from '@nestjs/testing';
import { ProviderStatusService } from './provider-status.service';

describe('ProviderStatusService', () => {
	let service: ProviderStatusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProviderStatusService],
		}).compile();

		service = module.get<ProviderStatusService>(ProviderStatusService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
