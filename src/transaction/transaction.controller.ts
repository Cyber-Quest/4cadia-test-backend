import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterDto } from 'src/utils/src';
import { JwtAuthGuard } from 'src/utils/src/guards'; 

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService, 
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('extract/:name')
  findAll(
    @Param('name') name: string,
    @Req() req: any,
    @Query() filter: FilterDto,
  ) {
    const { user } = req;
    return this.transactionService.findAll(user, filter, name);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('deposit/:name')
  deposit(
    @Req() req: any,
    @Param('name') name: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { user } = req;
    return this.transactionService.deposit(name, createTransactionDto, user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('draw/:name')
  draw(
    @Req() req: any,
    @Param('name') name: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { user } = req;
    return this.transactionService.draw(name, createTransactionDto, user);
  }
}
