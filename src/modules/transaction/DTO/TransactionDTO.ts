import { IsUUID, IsDate, IsNumber, IsDecimal } from 'class-validator';

export class TransactionDTO {
  @IsUUID()
  accountId: string;

  @IsNumber()
  @IsDecimal()
  value: number;

  @IsDate()
  transactionDate: Date;
}
