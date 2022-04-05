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
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterDto } from 'src/utils/src';
import { JwtAuthGuard } from 'src/utils/src/guards';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { Transaction } from './entities/transaction.entity';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOkResponse({
    type: [Transaction],
  })
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

  @ApiCreatedResponse({
    type: Account,
  })
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

  @ApiCreatedResponse({
    type: Account,
  })
  @ApiNotFoundResponse({
    description: 'Insufficient funds',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CONFLICT,
        },
        message: {
          type: 'string',
          example: 'Insufficient funds',
        },
      },
    },
  })
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
