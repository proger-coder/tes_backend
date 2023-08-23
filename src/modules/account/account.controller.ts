import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO, UpdateBalanceDTO } from './DTO';
import { TransactionDTO } from '../transaction/DTO/TransactionDTO';
import { TransactionService } from '../transaction/transaction.service';
import { IpWhitelistGuard } from '../../guards/ip-whitelist.guard';
import { IpWhitelistService } from '../../services/ip-whitelist.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService,
    private readonly ipWhitelistService: IpWhitelistService,
  ) {}

  // Создание аккаунта
  @ApiOperation({ summary: 'Создание аккаунта' })
  @ApiResponse({ status: 201, description: 'Аккаунт успешно создан.' })
  @Post()
  create(@Body() createAccountDto: CreateAccountDTO) {
    return this.accountService.create(createAccountDto);
  }

  // Получить баланс на аккаунте
  @ApiOperation({ summary: 'Получение баланса на аккаунте' })
  @ApiParam({ name: 'accountId', description: 'ID аккаунта' })
  @Get(':accountId/balance')
  @UseGuards(IpWhitelistGuard)
  async getBalance(
    @Param('accountId') accountId: string,
  ): Promise<{ balance: number }> {
    const balance = await this.accountService.getBalance(accountId);
    return { balance };
  }

  // Изменить баланс - пополнение или снятие.
  // Пополнение > 0, снятие < 0. Заодно пишем в историю транзакций
  @ApiOperation({ summary: 'Изменение баланса' })
  @ApiBody({
    description: 'Данные для изменения баланса',
    type: UpdateBalanceDTO,
  })
  @Patch('balance')
  async updateBalance(@Body() updateBalanceDto: UpdateBalanceDTO) {
    // Обновляем баланс аккаунта
    const updatedAccount = await this.accountService.updateBalance(
      updateBalanceDto,
    );

    // Создаем запись о транзакции
    const transactionDto: TransactionDTO = {
      accountId: updateBalanceDto?.accountId,
      value: updateBalanceDto.value,
      transactionDate: new Date(),
    };
    await this.transactionService.create(transactionDto); // Предполагается, что у вас есть такой метод в TransactionService

    return updatedAccount;
  }

  // Блокировка аккаунта
  @ApiOperation({ summary: 'Блокировка аккаунта' })
  @ApiBody({ description: 'ID аккаунта', type: String })
  @Patch('block')
  blockAccount(@Body('accountId') accountId) {
    return this.accountService.blockAccount(accountId);
  }

  // добавить ip в белый список
  @ApiOperation({ summary: 'Добавить IP в белый список' })
  @ApiBody({ description: 'IP-адрес', type: String })
  @Post('whitelist')
  addToWhitelist(@Body() data: { ip: string }) {
    this.ipWhitelistService.add(data.ip);
    return { message: 'IP добавлен в белый список :]' };
  }

  // удалить ip из белого списка
  @ApiOperation({ summary: 'Удалить IP из белого списка' })
  @ApiBody({ description: 'IP-адрес', type: String })
  @Delete('whitelist')
  removeFromWhitelist(@Body() data: { ip: string }) {
    this.ipWhitelistService.remove(data.ip);
    return { message: 'IP удалён из белого списка :]' };
  }

  // Получить полную информацию об аккаунте
  @ApiOperation({ summary: 'Получение информации об аккаунте' })
  @ApiParam({ name: 'accountId', description: 'ID аккаунта' })
  @Get(':accountId')
  findOne(@Param('accountId') accountId: string) {
    return this.accountService.findAccountById(accountId);
  }
}
