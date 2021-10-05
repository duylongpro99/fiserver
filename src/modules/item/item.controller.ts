import { User } from './../../entity/user/user.entity';
import { ItemService } from './item.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemDto } from 'src/entity/item/item.dto';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Get()
  public async getAll() {
    return await this.itemService.getAll();
  }

  @Post()
  public async post(user: User, @Body() dto: ItemDto): Promise<ItemDto> {
    return this.itemService.create(dto, user);
  }
}
