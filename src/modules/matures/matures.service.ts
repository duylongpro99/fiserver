import { Injectable } from '@nestjs/common';
import { CreateMatureDto } from './dto/create-mature.dto';
import { UpdateMatureDto } from './dto/update-mature.dto';

@Injectable()
export class MaturesService {
  create(createMatureDto: CreateMatureDto) {
    return 'This action adds a new mature';
  }

  findAll() {
    return `This action returns all matures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mature`;
  }

  update(id: number, updateMatureDto: UpdateMatureDto) {
    return `This action updates a #${id} mature`;
  }

  remove(id: number) {
    return `This action removes a #${id} mature`;
  }
}
