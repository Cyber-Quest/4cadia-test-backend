import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/entities/user.entity'; 

export class CreateAccountDto {
  @ApiHideProperty()
  @IsOptional()
  user: User;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dailyWithdrawalLimit: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountType: string;
}

export class AdditionalAccountDto {
  @ApiProperty({
    default: User
  }) 
  @IsOptional()
  user: User;
}
