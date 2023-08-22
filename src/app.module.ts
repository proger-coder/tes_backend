import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';

@Module({
  imports: [AccountModule, ClientModule, TransactionModule],
  controllers: [
    /*AppController*/
  ],
  providers: [
    /*AppService*/
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('account');
  }
}
