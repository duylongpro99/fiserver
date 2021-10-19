import { Test, TestingModule } from '@nestjs/testing';
import { MaturesController } from './matures.controller';
import { MaturesService } from './matures.service';

describe('MaturesController', () => {
  let controller: MaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaturesController],
      providers: [MaturesService],
    }).compile();

    controller = module.get<MaturesController>(MaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
