import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { FilterDto } from 'src/utils/src';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { name } = createAccountDto;
    const accountFound = await this.accountRepository.findOne({
      where: {
        name: name,
      },
    });

    if (accountFound) {
      throw new NotFoundException(`Account already registered`);
    }

    const account = await this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  findAll(user: User, filter: FilterDto) {
    const relations = ['user'];
    const { skip, take } = filter;
    return this.accountRepository.find({
      where: { user: user },
      skip,
      take,
      relations: relations,
    });
  }

  async findOne(name: string, user: User) {  
    const account = await this.accountRepository.findOne({
      where: {
        name: name,
        user: user,
      },
    });

    if (!account) throw new NotFoundException('Account not found');

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto){    
    const account = await this.accountRepository.preload({
      id: id,
      ...updateAccountDto,
    });
    if (!account) throw new NotFoundException(`account ID ${id} not found!`);

    return this.accountRepository.save(account);
  }
}
