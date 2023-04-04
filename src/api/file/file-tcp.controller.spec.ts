import { Test, TestingModule } from '@nestjs/testing';
import { FileTcpController } from './file-tcp.controller';

describe('FileTcpController', () => {
	let controller: FileTcpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FileTcpController],
		}).compile();

		controller = module.get<FileTcpController>(FileTcpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
