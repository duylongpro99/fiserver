import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { Mature } from './../../matures/entities/mature.entity';
@Entity({ name: 'refJobMature' })
export class RefJobMature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (j) => j.refJobMatures)
  job: Job;

  @ManyToOne(() => Mature, (m) => m.refJobMatures)
  mature: Mature;
}
