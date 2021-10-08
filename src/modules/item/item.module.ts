import { RedisCacheService } from './../redis-cache/redis-cache.service';
import { Item } from './../../entity/item/item.entity';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CacheModule.register()],
  controllers: [ItemController],
  providers: [ItemService, RedisCacheService],
})
export class ItemModule {}
