import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  user_name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
