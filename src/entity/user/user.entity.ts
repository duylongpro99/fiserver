import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;
}
