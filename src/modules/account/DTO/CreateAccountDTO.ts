import {
  IsUUID,
  IsNumber,
  IsBoolean,
  IsInt,
  IsDate,
  IsDecimal,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
//import { IsUUID, IsNumber, IsDecimal, IsBoolean, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({ description: 'ID клиента' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Текущий баланс' })
  @IsNumber() // проверка, что это число
  @IsDecimal() //проверка, что оно десятичное
  balance: number;

  @ApiProperty({ description: 'Дневной лимит вывода' })
  @IsNumber() // проверка, что это число
  @IsDecimal() //проверка, что оно десятичное
  daily_withdrawal_limit: number;

  @ApiProperty({ description: 'Статус активности аккаунта' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'Тип аккаунта' })
  @IsInt()
  accountType: number;

  @ApiProperty({ description: 'Дата создания аккаунта', required: false })
  @IsOptional()
  @IsDate()
  createDate?: Date;
}
