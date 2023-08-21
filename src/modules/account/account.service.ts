import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateBalance(accountId: string, updateData: UpdateBalanceDTO) {
    await this.findAccountById(accountId); // проверка существования аккаунта
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
