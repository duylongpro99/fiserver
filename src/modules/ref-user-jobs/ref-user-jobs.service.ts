import { Injectable } from '@nestjs/common';
import { CreateRefUserJobDto } from './dto/create-ref-user-job.dto';
import { UpdateRefUserJobDto } from './dto/update-ref-user-job.dto';

@Injectable()
export class RefUserJobsService {
  create(createRefUserJobDto: CreateRefUserJobDto) {
    return 'This action adds a new refUserJob';
  }

  findAll() {
    return `This action returns all refUserJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refUserJob`;
  }

  update(id: number, updateRefUserJobDto: UpdateRefUserJobDto) {
    return `This action updates a #${id} refUserJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} refUserJob`;
  }
}
