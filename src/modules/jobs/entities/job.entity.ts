import { RefJobMature } from './../../ref-job-matures/entities/ref-job-mature.entity';
import { RefUserJob } from './../../ref-user-jobs/entities/ref-user-job.entity';
import { Company } from './../../companies/entities/company.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entity/base.entity';

@Entity({ name: 'job' })
export class Job extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', length: 200 })
  salary: string;

  @Column({ type: 'numeric' })
  status: number;

  @Column({ type: 'uuid' })
  companyId: string;

  @Column({ type: 'numeric' })
  experienceYears: number;

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @OneToMany(() => RefUserJob, (refUserJob) => refUserJob.job)
  refUserJobs: RefUserJob[];

  @OneToMany(() => RefJobMature, (jm) => jm.job)
  refJobMatures: RefJobMature[];
}
