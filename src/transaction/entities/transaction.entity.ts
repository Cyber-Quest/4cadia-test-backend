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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;
  
  @Column()
  type: string;
 
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  constructor(user?: Partial<Transaction>) {
    this.id = user?.id;
    this.amount = user?.amount;
    this.description = user?.description; 
  }
}
