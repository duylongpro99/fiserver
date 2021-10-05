import { User } from './../../entity/user/user.entity';
import { ItemDto } from './../../entity/item/item.dto';
import { Item } from '../../entity/item/item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: ItemDto, user: User): Promise<ItemDto> {
    return this.repo
      .save(dto.toEntity(user))
      .then((e) => ItemDto.fromEntity(e));
  }
}
