import { Test, TestingModule } from '@nestjs/testing';
import { RefJobMaturesService } from './ref-job-matures.service';

describe('RefJobMaturesService', () => {
  let service: RefJobMaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefJobMaturesService],
    }).compile();

    service = module.get<RefJobMaturesService>(RefJobMaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
