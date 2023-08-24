import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAccountDTO, UpdateBalanceDTO } from './DTO';

// Создание аккаунта, пополнение счета, получение баланса, снятие денег, блокировка аккаунта

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(accountData: CreateAccountDTO) {
    return this.prisma.account.create({
      data: accountData,
    });
  }

  async findAccountById(accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException('Аккаунт не найден :[');
    }
    return account;
  }

  async getBalance(accountId: string): Promise<number> {
    const account = await this.findAccountById(accountId);
    return account.balance;
  }

  async checkIfBlocked(accountId: string): Promise<boolean> {
    const account = await this.findAccountById(accountId);
    return account.active;
  }

  // Изменить баланс, если аккаунт не заблокирован
  async updateBalance(updateData: UpdateBalanceDTO) {
    const accountId = updateData?.accountId;
    await this.findAccountById(accountId); // Проверка существования аккаунта

    const active = await this.checkIfBlocked(accountId);
    if (!active) {
      throw new ForbiddenException('Аккаунт заблокирован :[');
    }

    const currentBalance = await this.getBalance(accountId);
    if (updateData.value < 0 && Math.abs(updateData.value) > currentBalance) {
      throw new BadRequestException('Мало средств на счёте :[');
    }

    return this.prisma.account.update({
      where: { id: accountId },
      data: { balance: { increment: updateData.value } },
    });
  }

  async blockAccount(accountId: string) {
    await this.findAccountById(accountId); // проверка существования аккаунта
    return this.prisma.account.update({
      where: { id: accountId },
      data: { active: false },
    });
  }
}
