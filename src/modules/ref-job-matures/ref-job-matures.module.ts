import { Module } from '@nestjs/common';
import { RefJobMaturesService } from './ref-job-matures.service';
import { RefJobMaturesController } from './ref-job-matures.controller';

@Module({
  controllers: [RefJobMaturesController],
  providers: [RefJobMaturesService]
})
export class RefJobMaturesModule {}
