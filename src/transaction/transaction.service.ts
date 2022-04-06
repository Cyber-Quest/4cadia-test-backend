import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { User } from 'src/auth/entities/user.entity';
import { FilterDto } from 'src/utils/src';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionService: Repository<Transaction>,
    private readonly accountService: AccountService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionService.create(
      createTransactionDto,
    );
    return await this.transactionService.save(transaction);
  }

  findAll(user: User, filter: FilterDto, name: string) {
    const relations = ['account'];
    const { skip, take } = filter;
    return this.transactionService.find({
      where: { user: user },
      skip,
      take,
      relations: relations,
    });
  }

  async deposit(
    name: string,
    createTransactionDto: CreateTransactionDto,
    user: User,
  ) {
    const { amount } = createTransactionDto;
    const account = await this.accountService.findOne(name, user);
    account.balance = account.balance + Math.abs(amount);
    createTransactionDto.account = account;
    createTransactionDto.user = user;
    createTransactionDto.type = "deposit"

    this.transactionService.create(createTransactionDto);
    await this.transactionService.save(createTransactionDto);
    return this.accountService.update(account.id, account);
  }

  async draw(
    name: string,
    createTransactionDto: CreateTransactionDto,
    user: User,
  ) {
    const { amount } = createTransactionDto;
    const account = await this.accountService.findOne(name, user);
    account.balance = account.balance - Math.abs(amount);
    createTransactionDto.account = account;
    createTransactionDto.user = user; 
    createTransactionDto.type = "draw"

    if (account.balance - Math.abs(amount) < 0)
      throw new ConflictException('Insufficient funds');

    this.transactionService.create(createTransactionDto);
    await this.transactionService.save(createTransactionDto);
    return this.accountService.update(account.id, account);
  }
}
