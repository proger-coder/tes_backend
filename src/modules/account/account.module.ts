import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'nestjs-prisma';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  providers: [AccountService, PrismaService, TransactionService],
  controllers: [AccountController],
})
export class AccountModule {}
