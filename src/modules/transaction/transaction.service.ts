import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TransactionDTO } from './DTO/TransactionDTO';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(transactionData: TransactionDTO): Promise<TransactionDTO> {
    return this.prisma.transaction.create({ data: transactionData });
  }

  async getHistory(accountId: string): Promise<TransactionDTO[]> {
    return this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: { transactionDate: 'desc' },
    });
  }
}
