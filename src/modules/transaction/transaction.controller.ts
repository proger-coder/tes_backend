import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './DTO/TransactionDTO';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Создание транзакции' })
  @ApiBody({ description: 'Данные транзакции', type: TransactionDTO })
  @ApiResponse({ status: 201, description: 'Транзакция успешно создана.' })
  @ApiResponse({ status: 400, description: 'Неверный запрос.' })
  @Post()
  create(@Body() transactionData: TransactionDTO): Promise<TransactionDTO> {
    return this.transactionService.create(transactionData);
  }

  @ApiOperation({ summary: 'Получение истории транзакций по ID аккаунта' })
  @ApiParam({ name: 'accountId', description: 'ID аккаунта' })
  @ApiResponse({ status: 200, description: 'Успешное выполнение.' })
  @ApiResponse({ status: 404, description: 'Транзакции не найдены.' })
  @Get('history/:accountId')
  getHistory(@Param('accountId') accountId: string): Promise<TransactionDTO[]> {
    return this.transactionService.getHistory(accountId);
  }
}
