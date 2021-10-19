import { Module } from '@nestjs/common';
import { MaturesService } from './matures.service';
import { MaturesController } from './matures.controller';

@Module({
  controllers: [MaturesController],
  providers: [MaturesService]
})
export class MaturesModule {}
