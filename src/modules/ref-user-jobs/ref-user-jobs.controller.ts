import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefUserJobsService } from './ref-user-jobs.service';
import { CreateRefUserJobDto } from './dto/create-ref-user-job.dto';
import { UpdateRefUserJobDto } from './dto/update-ref-user-job.dto';

@Controller('ref-user-jobs')
export class RefUserJobsController {
  constructor(private readonly refUserJobsService: RefUserJobsService) {}

  @Post()
  create(@Body() createRefUserJobDto: CreateRefUserJobDto) {
    return this.refUserJobsService.create(createRefUserJobDto);
  }

  @Get()
  findAll() {
    return this.refUserJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refUserJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefUserJobDto: UpdateRefUserJobDto) {
    return this.refUserJobsService.update(+id, updateRefUserJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refUserJobsService.remove(+id);
  }
}
