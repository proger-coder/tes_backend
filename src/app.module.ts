import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [AccountModule, ClientModule, TransactionModule],
  controllers: [
    /*AppController*/
  ],
  providers: [
    /*AppService*/
  ],
})
export class AppModule {}
