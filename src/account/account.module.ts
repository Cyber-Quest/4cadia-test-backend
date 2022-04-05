import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthService } from 'src/auth/auth.service';
import { BcryptAdapter } from 'src/utils/src';
import { User } from 'src/auth/entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  controllers: [AccountController],
  providers: [AccountService, AuthService, BcryptAdapter] 
})
export class AccountModule {}
