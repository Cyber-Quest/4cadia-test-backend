import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto'; 

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    let { email, password } = signInDto;
    const userFound = await this.authService.findOne({ email: email });
    await this.authService.compareHash(password, userFound.password); 

    const token = await this.jwtService.sign({
      email: userFound.email,
      id: userFound.id,
    });

    const newUser = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      token: token
    }
    return newUser;
  }

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto) { 
    let { password } = signUpDto; 
    const newPassword = await this.authService.createHash(password);
    const user = await this.authService.create({
      ...signUpDto,
      password: newPassword
    });

    delete user.password;
    delete user.id;

    return user;
  }
}
