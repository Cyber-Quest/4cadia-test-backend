import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
