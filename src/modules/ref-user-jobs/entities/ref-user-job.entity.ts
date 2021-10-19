import { Column } from 'typeorm';

export class RefUserJob {
  @Column({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  jobId: string;

  @Column({ type: 'boolean' })
  isExpired: boolean;

  @Column({ type: 'boolean' })
  isDeleted: boolean;
}
