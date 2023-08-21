import { IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @Transform(({ value }) => new Date(value)) //потом убрать часы или преобразовать в строку вообще
  @IsDate()
  birthDate: Date;
}
