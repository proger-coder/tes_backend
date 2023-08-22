import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'nestjs-prisma';
import { TransactionService } from '../transaction/transaction.service';
import { IpWhitelistService } from '../../services/ip-whitelist.service';

@Module({
  providers: [
    AccountService,
    PrismaService,
    TransactionService,
    IpWhitelistService,
  ],
  controllers: [AccountController],
})
export class AccountModule {}
