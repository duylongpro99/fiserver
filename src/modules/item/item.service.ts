import { RedisCacheService } from './../redis-cache/redis-cache.service';
import { User } from './../../modules/users/entities/user.entity';
import { ItemDto } from './../../entity/item/item.dto';
import { Item } from '../../entity/item/item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
    private cacheManager: RedisCacheService,
  ) {}

  public async getAll() {
    this.setCacheItem();
    return await this.repo.find();
  }

  public async create(dto: ItemDto, user: User): Promise<ItemDto> {
    return this.repo
      .save(dto.toEntity(user))
      .then((e) => ItemDto.fromEntity(e));
  }

  // redis cache
  public async setCacheItem() {
    // const result = await this.repo.find();
    const result = 'cache value';
    await this.cacheManager.set('cacheKey', result);
    return result;
  }
  //
  async getCacheItem(key) {
    await this.cacheManager.get(key);
  }
}
