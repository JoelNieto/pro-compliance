import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Country } from './countries.entity';
import { Society } from './society.entity';
import { User } from './user.entity';

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  code: string;

  @Column({ type: 'boolean', default: false })
  is_pep: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  legal_representative: string;

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

  @Column({ type: 'text' })
  address: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'residence_country_id', referencedColumnName: 'id' })
  residence_country: Country;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'birth_country_id', referencedColumnName: 'id' })
  birth_country: Country;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'nationality_country_id', referencedColumnName: 'id' })
  nationality: Country;

  @OneToMany(() => Society, (society) => society.owner)
  societies: Society[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
