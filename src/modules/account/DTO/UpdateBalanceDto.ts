import { IsUUID, IsNumber, IsDecimal } from 'class-validator';

export class UpdateBalanceDto {
  @IsUUID()
  accountId: string;

  @IsNumber() // проверяем, что это число
  @IsDecimal() // проверяем, что оно десятичное
  value: number;
}
