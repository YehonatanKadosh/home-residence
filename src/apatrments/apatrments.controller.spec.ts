import { Test, TestingModule } from '@nestjs/testing';
import { ApatrmentsController } from './apatrments.controller';
import { ApatrmentsService } from './apatrments.service';

describe('ApatrmentsController', () => {
  let controller: ApatrmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApatrmentsController],
      providers: [ApatrmentsService],
    }).compile();

    controller = module.get<ApatrmentsController>(ApatrmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
