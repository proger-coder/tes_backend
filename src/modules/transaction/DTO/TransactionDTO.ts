import { IsUUID, IsDate, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDTO {
  @ApiProperty({ description: 'id аккаунта' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'сумма транзакции' })
  @IsNumber()
  @IsDecimal()
  value: number;

  @ApiProperty({ description: 'дата транзакции' })
  @IsDate()
  transactionDate: Date;
}
