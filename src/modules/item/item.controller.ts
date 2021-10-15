import { User } from '../../modules/users/entities/user.entity';
import { ItemService } from './item.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemDto } from '../../entity/item/item.dto';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Get()
  public async getAll() {
    if (this.itemService.getCacheItem('cacheKey')) {
      return this.itemService.getCacheItem('cacheKey');
    }
    return await this.itemService.getAll();
  }

  @Post()
  public async post(user: User, @Body() dto: ItemDto): Promise<ItemDto> {
    return this.itemService.create(dto, user);
  }
}
