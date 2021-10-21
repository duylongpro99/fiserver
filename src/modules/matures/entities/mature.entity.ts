import { RefJobMature } from './../../ref-job-matures/entities/ref-job-mature.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'mature' })
export class Mature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @OneToMany(() => RefJobMature, (jm) => jm.mature)
  refJobMatures: RefJobMature[];
}
