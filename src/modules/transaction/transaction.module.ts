import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
