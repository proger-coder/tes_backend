import { IsUUID, IsNumber, IsDecimal } from 'class-validator';

export class UpdateBalanceDTO {
  @IsUUID()
  accountId: string;

  @IsNumber() // проверяем, что это число
  @IsDecimal() // проверяем, что оно десятичное
  value: number;
}
