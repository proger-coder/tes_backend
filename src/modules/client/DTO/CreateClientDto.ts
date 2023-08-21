import { IsString, IsDate } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsDate()
  birthDate: Date;
}
