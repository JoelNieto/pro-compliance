import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  public user_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  public email: string;

  @Column({ type: 'varchar', select: false })
  public password: string;
}
