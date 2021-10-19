import { Test, TestingModule } from '@nestjs/testing';
import { RefUserJobsService } from './ref-user-jobs.service';

describe('RefUserJobsService', () => {
  let service: RefUserJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefUserJobsService],
    }).compile();

    service = module.get<RefUserJobsService>(RefUserJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
