import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('boolean', { default: true })
  active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
  
  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.email = user?.email;
    this.password = user?.password;
    this.created_at = user?.created_at;
    this.updated_at = user?.updated_at; 
  }

}
