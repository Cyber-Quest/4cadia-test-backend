import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptAdapter } from '../utils/src';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async findOne(value: any) {
    const auth = await this.authRepository.findOne({
      where: {
        ...value,
      },
    });

    if (!auth) {
      throw new NotFoundException(`User not found`);
    }

    return auth;
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto; 
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });    

    if (user) {
      throw new ConflictException(`User already registered`);
    }

    const auth = await this.authRepository.create(createUserDto);
    return await this.authRepository.save(auth);
  }

  async createHash(password: string) {  
    return await this.bcryptAdapter.hash(password);
  }

  async compareHash(password: string, toCompare) {
    const match = await this.bcryptAdapter.compare(password, toCompare);

    if (!match) {
      throw new NotFoundException('invalid credentials');
    } 

    return match;
  }
}
