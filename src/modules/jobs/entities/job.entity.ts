import { Column } from 'typeorm';
import { BaseEntity } from 'src/entity/base.entity';
export class Job extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'nvarchar', length: 'MAX' })
  content: string;

  @Column({ type: 'nvarchar', length: 200 })
  salary: string;

  @Column({ type: 'numeric' })
  status: number;
}
