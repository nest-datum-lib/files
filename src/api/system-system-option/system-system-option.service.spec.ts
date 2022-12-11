import { Test, TestingModule } from '@nestjs/testing';
import { SystemSystemOptionService } from './system-system-option.service';

describe('SystemSystemOptionService', () => {
	let service: SystemSystemOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			Systems: [SystemSystemOptionService],
		}).compile();

		service = module.get<SystemSystemOptionService>(SystemSystemOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
