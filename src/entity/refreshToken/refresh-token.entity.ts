import { User } from '../../modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'refreshTokens' })
export class RefreshTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  isRevoked: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  expires: Date;

  @OneToOne(() => User, (user) => user.refreshToken)
  @JoinColumn()
  userId: string;
}
