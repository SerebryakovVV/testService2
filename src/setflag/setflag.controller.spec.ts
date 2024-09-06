import { Test, TestingModule } from '@nestjs/testing';
import { SetflagController } from './setflag.controller';

describe('SetflagController', () => {
  let controller: SetflagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetflagController],
    }).compile();

    controller = module.get<SetflagController>(SetflagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
