import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../account/entities/account.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    default: 'any_username',
  })
  @Column()
  username: string;

  @ApiProperty({
    default: 'any_email@mail.com',
  })
  @Column({ unique: true })
  email: string;
  
  @ApiProperty({
    default: 'any_password',
  })
  @Column()
  password: string;

  @ApiProperty({
    default: true,
  })
  @Column('boolean', { default: true })
  active: boolean;

  @ApiProperty({
    default: new Date(),
  })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({
    default: new Date(),
  })
  @UpdateDateColumn()
  updated_at?: Date;
  
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
  
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.email = user?.email;
    this.password = user?.password;
    this.created_at = user?.created_at;
    this.updated_at = user?.updated_at;
  }
}
