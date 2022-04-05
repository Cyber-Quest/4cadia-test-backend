import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Account } from "src/account/entities/account.entity";
import { User } from "src/auth/entities/user.entity";

export class CreateTransactionDto { 
  @IsOptional()
  user: User;

  @IsOptional()
  account: Account;
  
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
