import { BaseEntity } from '../../../entity/base.entity';
import { Job } from '../../jobs/entities/job.entity';
import { Location } from '../../location/entities/location.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'uuid' })
  locationId: string;

  @ManyToMany(() => Location, (location) => location.companies, {
    cascade: true,
  })
  @JoinTable()
  locations: Location[];

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
