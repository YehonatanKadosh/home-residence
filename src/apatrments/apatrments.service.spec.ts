import { Test, TestingModule } from '@nestjs/testing';
import { ApatrmentsService } from './apatrments.service';

describe('ApatrmentsService', () => {
  let service: ApatrmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApatrmentsService],
    }).compile();

    service = module.get<ApatrmentsService>(ApatrmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
