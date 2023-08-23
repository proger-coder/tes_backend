import { IsUUID, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDTO {
  @ApiProperty({ description: 'id аккаунта' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ description: 'сумма операции' })
  @IsNumber() // проверяем, что это число
  @IsDecimal() // проверяем, что оно десятичное
  value: number;
}
