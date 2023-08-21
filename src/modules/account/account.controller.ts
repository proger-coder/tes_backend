import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO, UpdateBalanceDTO } from './DTO';
import { TransactionDTO } from '../transaction/DTO/TransactionDTO';
import { TransactionService } from '../transaction/transaction.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService,
  ) {}

  // Создание аккаунта
  @Post()
  create(@Body() createAccountDto: CreateAccountDTO) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':accountId')
  findOne(@Param('accountId') accountId: string) {
    return this.accountService.findAccountById(accountId);
  }

  // Получить баланс
  @Get(':accountId/balance')
  async getBalance(
    @Param('accountId') accountId: string,
  ): Promise<{ balance: number }> {
    const balance = await this.accountService.getBalance(accountId);
    return { balance };
  }

  // Изменить баланс - пополнение или снятие. Пополнение > 0, снятие < 0. Заодно пишем в историю транзакций
  @Patch(':accountId/balance')
  async updateBalance(
    @Param('accountId') accountId: string,
    @Body() updateBalanceDto: UpdateBalanceDTO,
  ) {
    // Обновляем баланс аккаунта
    const updatedAccount = await this.accountService.updateBalance(
      accountId,
      updateBalanceDto,
    );

    // Создаем запись о транзакции
    const transactionDto: TransactionDTO = {
      accountId: accountId,
      value: updateBalanceDto.value,
      transactionDate: new Date(),
    };
    await this.transactionService.create(transactionDto); // Предполагается, что у вас есть такой метод в TransactionService

    return updatedAccount;
  }

  // Блокировка аккаунта
  @Patch('block')
  blockAccount(@Body('accountId') accountId) {
    return this.accountService.blockAccount(accountId);
  }
}
