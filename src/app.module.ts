import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { RateLimiterMiddleware } from './middlewares/rate-limit.middleware';
import { AppController } from './app.controller';
import { IpWhitelistGuard } from './guards/ip-whitelist.guard';
import { IpWhitelistService } from './services/ip-whitelist.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [AccountModule, ClientModule, TransactionModule],
  controllers: [AppController],
  providers: [IpWhitelistGuard, IpWhitelistService, PrismaService],
})
export class AppModule implements NestModule {
  // используем RateLimiterMiddleware для ограничения кол-ва запросов на получение текущего счёта в день
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes(
      // только для GET-запросов на эндпоинты:
      { path: 'account/:accountId', method: RequestMethod.GET },
      { path: 'account/:accountId/balance', method: RequestMethod.GET },
    );
  }
}
