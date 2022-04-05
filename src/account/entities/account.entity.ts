import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    default: 'any_name',
  })
  @Column({ unique: true })
  name: string;
 
  @ApiProperty({
    default: 300,
  })
  @Column()
  dailyWithdrawalLimit: number;

  @ApiProperty({
    default: 300,
  })
  @Column()
  balance: number;

  @ApiProperty({
    default: "corrente",
  })
  @Column()
  accountType: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
 
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  constructor(user?: Partial<Account>) {
    this.id = user?.id;
    this.dailyWithdrawalLimit = user?.dailyWithdrawalLimit;
    this.balance = user?.balance;
    this.accountType = user?.accountType;
  }
}
