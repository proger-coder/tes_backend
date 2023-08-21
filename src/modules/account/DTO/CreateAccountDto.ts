import {
  IsUUID,
  IsNumber,
  IsBoolean,
  IsInt,
  IsDate,
  IsDecimal,
} from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  personId: string;

  @IsNumber() // проверка на число
  @IsDecimal() // проверка на десятичность
  balance: number;

  @IsNumber() // проверка на число
  @IsDecimal() // проверка на десятичность
  daily_withdrawal_limit: number;

  @IsBoolean()
  active: boolean;

  @IsInt()
  accountType: number;

  @IsDate()
  createDate: Date;
}
