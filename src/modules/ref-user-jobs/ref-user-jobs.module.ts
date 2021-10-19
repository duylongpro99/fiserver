import { Module } from '@nestjs/common';
import { RefUserJobsService } from './ref-user-jobs.service';
import { RefUserJobsController } from './ref-user-jobs.controller';

@Module({
  controllers: [RefUserJobsController],
  providers: [RefUserJobsService]
})
export class RefUserJobsModule {}
