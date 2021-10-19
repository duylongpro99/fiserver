import { Test, TestingModule } from '@nestjs/testing';
import { RefUserJobsController } from './ref-user-jobs.controller';
import { RefUserJobsService } from './ref-user-jobs.service';

describe('RefUserJobsController', () => {
  let controller: RefUserJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefUserJobsController],
      providers: [RefUserJobsService],
    }).compile();

    controller = module.get<RefUserJobsController>(RefUserJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
