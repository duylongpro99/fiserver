import { BaseEntity } from 'src/entity/base.entity';
import { Column } from 'typeorm';
export class Company extends BaseEntity {
  @Column({ type: 'nvarchar', length: 500 })
  name: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  description: string;

  @Column({ type: 'nvarchar', length: 500 })
  address: string;

  @Column({ type: 'boolean' })
  active: boolean;
}
