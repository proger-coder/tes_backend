// account.controller.ts

import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO, UpdateBalanceDTO, BlockAccountDTO } from './DTO';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDTO) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':accountId')
  findOne(@Param('accountId') accountId: string) {
    return this.accountService.findAccountById(accountId);
  }

  @Get(':accountId/balance')
  async getBalance(
    @Param('accountId') accountId: string,
  ): Promise<{ balance: number }> {
    const balance = await this.accountService.getBalance(accountId);
    return { balance };
  }

  @Patch(':accountId/balance')
  updateBalance(
    @Param('accountId') accountId: string,
    @Body() updateBalanceDto: UpdateBalanceDTO,
  ) {
    return this.accountService.updateBalance(accountId, updateBalanceDto);
  }

  @Patch(':accountId/block')
  blockAccount(
    @Param('accountId') accountId: string,
    @Body() blockAccountDto: BlockAccountDTO,
  ) {
    return this.accountService.blockAccount(accountId, blockAccountDto);
  }
}
