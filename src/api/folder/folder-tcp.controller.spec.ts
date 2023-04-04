import { Test, TestingModule } from '@nestjs/testing';
import { FolderTcpController } from './folder-tcp.controller';

describe('FolderTcpController', () => {
	let controller: FolderTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FolderTcpController],
		}).compile();

		controller = module.get<FolderTcpController>(FolderTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
