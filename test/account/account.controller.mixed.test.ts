// import { Test, TestingModule } from '@nestjs/testing';
 import * as request from 'supertest';
// import { INestApplication } from '@nestjs/common';
// import { AccountController } from '../src/modules/account/account.controller';
// import { AccountService } from '../src/modules/account/account.service';
// import { TransactionService } from '../src/modules/transaction/transaction.service';
// import { IpWhitelistService } from '../src/services/ip-whitelist.service';
// import { CreateAccountDTO } from '../src/modules/account/DTO';
// import { PrismaService } from 'nestjs-prisma';
// import { IpWhitelistGuard } from '../src/guards/ip-whitelist.guard';

import { AccountController } from '../../src/modules/account/account.controller';
import { AccountService } from '../../src/modules/account/account.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { TransactionService } from '../../src/modules/transaction/transaction.service';
import { IpWhitelistService } from '../../src/services/ip-whitelist.service';
import { INestApplication } from '@nestjs/common';
import { IpWhitelistGuard } from '../../src/guards/ip-whitelist.guard';
import { CreateAccountDTO } from '../../src/modules/account/DTO';

/** интеграционные тесты */
describe('AccountController', () => {
  let app: INestApplication;

  // заменяем Гард, иначе он заблочит тесты по ip (с неизвестного ip)
  const mockIpWhitelistGuard = {
    canActivate: jest.fn().mockReturnValue(true), // Всегда разрешаем
  };

  // Создал подставной "AccountService" с упрощёнными методами
  const accountService = {
    create: jest.fn().mockImplementation((dto) => {
      return Promise.resolve({
        id: 'someId',
        ...dto,
      });
    }),

    findAccountById: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        id: 'someId',
        personId: 'somePersonId',
        balance: 1000,
        daily_withdrawal_limit: 500,
        active: true,
        accountType: 1,
        createDate: new Date(),
      });
    }),

    getBalance: jest.fn().mockImplementation(() => {
      return Promise.resolve(1000);
    }),
  };

  // Настройка перед каждым тестовым блоком
  beforeEach(async () => {
    // Создаю тестовый модуль, используя NestJS TestingModule
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AccountController], // Контроллеры, которые необходимо протестировать
      providers: [
        { provide: AccountService, useValue: accountService }, // Замена реального сервиса на подставной (mock)
        TransactionService,
        IpWhitelistService,
        PrismaService,
        { provide: IpWhitelistGuard, useValue: mockIpWhitelistGuard }, // гард тоже подменяем
      ],
    }).compile();

    // Инициализация приложения
    app = moduleRef.createNestApplication();
    app.use((req, res, next) => {
      console.log('HTTP Request:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      });
      next();
    });

    await app.init();
  });

  // Тестим создание аккаунта
  it('создать аккаунт', () => {
    // Тестовые данные для создания аккаунта
    const accountDTO: CreateAccountDTO = {
      personId: '1-2-3',
      balance: 100.0,
      daily_withdrawal_limit: 300.0,
      active: true,
      accountType: 1,
    };

    // шлём POST запрос на AccountController
    return request(app.getHttpServer())
      .post('/account')
      .send(accountDTO)
      .expect(201); // Ожидается, что ответ будет со статусом 201 (Created)
  });

  it('вернуть баланс аккаунта', () => {
    const accountId = 'someId'; // Это значение должно соответствовать тому, что возвращает mock findAccountById

    return request(app.getHttpServer())
      .get(`/account/${accountId}/balance`)
      .expect(200) // Ожидается статус OK
      .then((response) => {
        console.log(response.body);
        expect(response.body.balance).toEqual(1000); // Проверка, что баланс соответствует ожидаемому значению
      });
  });

  it('выбросить ошибку, если аккаунт не существует', () => {
    const nonExistentAccountId = 'nonExistentId'; // ID, которого нет в mock

    // Обновим mock для этого теста
    accountService.findAccountById.mockImplementation((id) => {
      if (id === nonExistentAccountId) {
        return Promise.resolve(null); // Имитация отсутствующего аккаунта
      }
      return Promise.resolve({
        id,
        personId: 'somePersonId',
        balance: 1000,
        daily_withdrawal_limit: 500,
        active: true,
        accountType: 1,
        createDate: new Date(),
      });
    });

    return request(app.getHttpServer())
      .get(`/account/${nonExistentAccountId}/balance`)
      .expect(404); // Ожидается статус Not Found
  });

  // Очистка ресурсов после выполнения всех тестов
  afterAll(async () => {
    await app.close();
  });
});
