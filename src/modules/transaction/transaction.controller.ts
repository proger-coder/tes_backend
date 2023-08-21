import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './DTO/TransactionDTO';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() transactionData: TransactionDTO): Promise<TransactionDTO> {
    return this.transactionService.create(transactionData);
  }

  @Get('history/:accountId')
  getHistory(@Param('accountId') accountId: string): Promise<TransactionDTO[]> {
    return this.transactionService.getHistory(accountId);
  }
}
