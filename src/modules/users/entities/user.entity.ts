import { RefUserJob } from './../../ref-user-jobs/entities/ref-user-job.entity';
import { RefreshTokens } from './../../../entity/refreshToken/refresh-token.entity';
import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../entity/base.entity';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'user' })
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

  @OneToOne(() => RefreshTokens, (rToken) => rToken.userId)
  refreshToken: RefreshTokens;

  @OneToMany(() => RefUserJob, (refUserJob) => refUserJob.job)
  refUserJobs: RefUserJob[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
