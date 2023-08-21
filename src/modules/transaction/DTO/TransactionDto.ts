import { IsUUID, IsDate, IsNumber, IsDecimal } from 'class-validator';

export class TransactionDto {
  @IsUUID()
  accountId: string;

  @IsNumber()
  @IsDecimal()
  value: number;

  @IsDate()
  transactionDate: Date;
}
