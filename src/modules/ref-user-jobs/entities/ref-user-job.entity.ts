import { User } from '../../users/entities/user.entity';
import { Job } from '../../jobs/entities/job.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refUserJob')
export class RefUserJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  jobId: string;

  @Column({ type: 'boolean' })
  isExpired: boolean;

  @Column({ type: 'boolean' })
  isDeleted: boolean;

  @ManyToOne(() => Job, (job) => job.refUserJobs)
  job: Job;

  @ManyToOne(() => User, (user) => user.refUserJobs)
  user: User;
}
