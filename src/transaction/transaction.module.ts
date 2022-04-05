import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller'; 
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from 'src/auth/entities/user.entity';  
import { AuthService } from 'src/auth/auth.service';
import { BcryptAdapter } from 'src/utils/src';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, Account])],
  controllers: [TransactionController],
  providers: [TransactionService, AccountService, BcryptAdapter],
})

export class TransactionModule {}
