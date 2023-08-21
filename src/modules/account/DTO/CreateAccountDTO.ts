import {
  IsUUID,
  IsNumber,
  IsBoolean,
  IsInt,
  IsDate,
  IsDecimal, IsOptional,
} from 'class-validator';

export class CreateAccountDTO {
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

  @IsOptional()
  @IsDate()
  createDate?: Date;
}
