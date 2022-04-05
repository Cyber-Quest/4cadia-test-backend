import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  description: string;
  
  @ApiProperty()
  @Column()
  type: string;
 
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ApiProperty()
  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  constructor(user?: Partial<Transaction>) {
    this.id = user?.id;
    this.amount = user?.amount;
    this.description = user?.description; 
  }
}
