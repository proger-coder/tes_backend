import { IsUUID, IsBoolean } from 'class-validator';

export class BlockAccountDto {
  @IsUUID()
  accountId: string;

  @IsBoolean()
  active: boolean; // Если `false`, то аккаунт блокируется
}
