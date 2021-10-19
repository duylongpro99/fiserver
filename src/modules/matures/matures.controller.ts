import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaturesService } from './matures.service';
import { CreateMatureDto } from './dto/create-mature.dto';
import { UpdateMatureDto } from './dto/update-mature.dto';

@Controller('matures')
export class MaturesController {
  constructor(private readonly maturesService: MaturesService) {}

  @Post()
  create(@Body() createMatureDto: CreateMatureDto) {
    return this.maturesService.create(createMatureDto);
  }

  @Get()
  findAll() {
    return this.maturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatureDto: UpdateMatureDto) {
    return this.maturesService.update(+id, updateMatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maturesService.remove(+id);
  }
}
