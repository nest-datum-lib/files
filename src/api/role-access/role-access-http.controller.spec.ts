import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccessHttpController } from './role-access-http.controller';

describe('RoleAccessHttpController', () => {
	let controller: RoleAccessHttpController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RoleAccessHttpController],
		}).compile();

		controller = module.get<RoleAccessHttpController>(RoleAccessHttpController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
