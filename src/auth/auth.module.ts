import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from '../config/jwt';
import { BcryptAdapter, JwtStrategy } from '../utils/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtConfig],
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter, JwtStrategy],
})
export class AuthModule {}
