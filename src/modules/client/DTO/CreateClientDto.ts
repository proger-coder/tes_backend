import { IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Имя клиента' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Документ клиента' })
  @IsString()
  document: string;

  @ApiProperty({ description: 'Дата рождения клиента', example: '2000-01-01' })
  @Transform(({ value }) => new Date(value)) // потом убрать часы или преобразовать в строку вообще
  @IsDate()
  birthDate: Date;
}
