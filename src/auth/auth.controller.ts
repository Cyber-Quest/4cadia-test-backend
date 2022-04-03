import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  IntersectionType,
  OmitType,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdditionalUserDto, CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOkResponse({
    type: IntersectionType(AdditionalUserDto, SignInDto),
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CONFLICT,
        },
        message: {
          type: 'string',
          example: 'User not found | invalid credentials',
        },
      },
    },
  })
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
      token: token,
    };
    
    return newUser;
  }

  @ApiOkResponse({
    type: OmitType(User, ['id'] as const),
    description: 'Success',
  })
  @ApiConflictResponse({
    description: 'User already registered',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CONFLICT,
        },
        message: {
          type: 'string',
          example: 'User already registered',
        },
      },
    },
  })
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto) {
    let { password } = signUpDto;
    const newPassword = await this.authService.createHash(password);
    
    const user = await this.authService.create({
      ...signUpDto,
      password: newPassword,
    });
 
    delete user.password;
    delete user.id;

    return user;
  }
}
