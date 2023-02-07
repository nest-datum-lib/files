import { Test, TestingModule } from '@nestjs/testing';
import { FolderService } from './folder.service';

describe('FolderService', () => {
	let service: FolderService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			Folders: [FolderService],
		}).compile();

		service = module.get<FolderService>(FolderService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
