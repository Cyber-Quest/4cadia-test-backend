import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { FilterDto } from 'src/utils/src';
import { JwtAuthGuard } from 'src/utils/src/guards';
import { AccountService } from './account.service';
import {
  AdditionalAccountDto,
  CreateAccountDto,
} from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({
    type: IntersectionType(Account, AdditionalAccountDto),
  })
  @ApiNotFoundResponse({
    description: 'Account already registered',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CONFLICT,
        },
        message: {
          type: 'string',
          example: 'Account already registered',
        },
      },
    },
  })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Req() req: any, @Body() createAccountDto: CreateAccountDto) {
    const { user } = req;
    const userFound = await this.authService.findOne({ id: user.id });
    createAccountDto.user = userFound;

    return this.accountService.create(createAccountDto);
  }

  @ApiOkResponse({
    type: [IntersectionType(Account, AdditionalAccountDto)],
  })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Req() req: any, @Query() params: FilterDto) {
    const { user } = req;
    return this.accountService.findAll(user, params);
  }

  @ApiOkResponse({
    type: IntersectionType(Account, AdditionalAccountDto),
  })
  @ApiNotFoundResponse({
    description: 'Account not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.NOT_FOUND,
        },
        message: {
          type: 'string',
          example: 'Account not found',
        },
      },
    },
  })
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const { user } = req;
    return this.accountService.findOne(id, user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: CreateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }
}
