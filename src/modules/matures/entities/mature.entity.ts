import { BaseEntity } from 'src/entity/base.entity';
import { Column } from 'typeorm';
export class Mature extends BaseEntity {
  @Column({ type: 'nvarchar', length: 300 })
  name: string;
}
