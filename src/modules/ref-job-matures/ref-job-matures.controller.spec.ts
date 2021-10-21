import { Test, TestingModule } from '@nestjs/testing';
import { RefJobMaturesController } from './ref-job-matures.controller';
import { RefJobMaturesService } from './ref-job-matures.service';

describe('RefJobMaturesController', () => {
  let controller: RefJobMaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefJobMaturesController],
      providers: [RefJobMaturesService],
    }).compile();

    controller = module.get<RefJobMaturesController>(RefJobMaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
