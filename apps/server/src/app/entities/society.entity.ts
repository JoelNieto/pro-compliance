import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Country } from './countries.entity';
import { Participant } from './participant.entity';

@Entity({ name: 'societies' })
export class Society {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  code: string;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  commercial_name: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  account_number: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  ruc: string;

  @Column({ type: 'date' })
  registration_date: Date;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'jurisdiction_country_id', referencedColumnName: 'id' })
  jurisdiction: Country;

  @ManyToOne(() => Participant, (participant) => participant.societies)
  @JoinColumn({ name: 'owner_participant_id', referencedColumnName: 'id' })
  owner: Participant;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
