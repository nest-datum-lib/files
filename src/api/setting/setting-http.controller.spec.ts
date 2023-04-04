import { Test, TestingModule } from '@nestjs/testing';
import { SettingHttpController } from './setting-http.controller';

describe('SettingHttpController', () => {
	let controller: SettingHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SettingHttpController],
		}).compile();

		controller = module.get<SettingHttpController>(SettingHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
