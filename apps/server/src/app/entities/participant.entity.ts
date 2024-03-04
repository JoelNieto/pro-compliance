import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Country } from './countries.entity';
import { User } from './user.entity';

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  first_name: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  last_name: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  document_id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'residence_country_id', referencedColumnName: 'id' })
  residence_country: Country;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'birth_country_id', referencedColumnName: 'id' })
  birth_country: Country;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'nationality_id', referencedColumnName: 'id' })
  nationality: Country;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
