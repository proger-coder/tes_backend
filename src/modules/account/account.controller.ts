// account.controller.ts

import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO, UpdateBalanceDTO } from './DTO';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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

  // Изменить баланс - пополнение или снятие. Пополнение > 0, снятие < 0
  @Patch(':accountId/balance')
  updateBalance(
    @Param('accountId') accountId: string,
    @Body() updateBalanceDto: UpdateBalanceDTO,
  ) {
    return this.accountService.updateBalance(accountId, updateBalanceDto);
  }

  // Блокировка аккаунта
  @Patch('block')
  blockAccount(@Body('accountId') accountId) {
    return this.accountService.blockAccount(accountId);
  }
}
