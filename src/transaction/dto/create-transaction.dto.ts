import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Account } from "src/account/entities/account.entity";
import { User } from "src/auth/entities/user.entity";

export class CreateTransactionDto { 
  @ApiHideProperty()
  @IsOptional()
  user: User;

  @ApiHideProperty()
  @IsOptional()
  account: Account;
  
  @ApiProperty({
    default: "corrente | poupança"
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
