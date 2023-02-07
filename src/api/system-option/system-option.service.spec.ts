import { Test, TestingModule } from '@nestjs/testing';
import { SystemOptionService } from './system-option.service';

describe('SystemOptionService', () => {
	let service: SystemOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			Systems: [SystemOptionService],
		}).compile();

		service = module.get<SystemOptionService>(SystemOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
