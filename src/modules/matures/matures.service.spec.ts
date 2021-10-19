import { Test, TestingModule } from '@nestjs/testing';
import { MaturesService } from './matures.service';

describe('MaturesService', () => {
  let service: MaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaturesService],
    }).compile();

    service = module.get<MaturesService>(MaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
