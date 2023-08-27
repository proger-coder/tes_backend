import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateClientDTO } from "../src/modules/client/DTO/CreateClientDTO";
import { AccountModule } from "../src/modules/account/account.module";
import { ClientModule } from "../src/modules/client/client.module";
import { TransactionModule } from "../src/modules/transaction/transaction.module";
import { CreateAccountDTO } from "../src/modules/account/DTO";
import { TransactionDTO } from "../src/modules/transaction/DTO/TransactionDTO";
import { AppModule } from "../src/app.module";

// тестируем всё приложение от создания клиента
describe('e2e flow: весь бекенд', () => {
  let app: INestApplication;

  // тестовые данные
  const testClientCreds:CreateClientDTO = {
    name: 'Клиент Тестов',
    document: 'документ 123456789',
    birthDate: new Date('2023-08-26'),
  }

  const testAccountCreds:CreateAccountDTO = {
    accountType: 1,
    active: true,
    balance: 99.99,
    daily_withdrawal_limit: 500,
    personId: ""
  };
  let testAccountId: string;

  const testAccountToBlockCreds:CreateAccountDTO = {
    accountType: 1,
    active: true,
    balance: 18.88,
    daily_withdrawal_limit: 500,
    personId: ""
  };
  let testAccountToBlockId: string;

  const testTransactionDeposit:TransactionDTO = {
    accountId: "",
    value: 100,
    transactionDate: new Date()
  }

  const testTransactionWithdrawal:TransactionDTO = {
    accountId: "",
    value: -50,
    transactionDate: new Date()
  }

  const newWhiteIP = "244.178.44.111";

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AccountModule, ClientModule, TransactionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /** главная страница */
  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);

    expect(response.text).toContain('<h3 style="color:green"> Вы зашли на запущенный сервер </h3><hr>');
  });

  /** создание клиента */
  it("/client (POST)", async function() {
    const response = await request(app.getHttpServer())
      .post('/client')
      .send(testClientCreds)
      .expect(201);

    const { id, name } = response.body;
    expect(name).toBe(testClientCreds.name);
    testAccountCreds.personId = id;
    testAccountToBlockCreds.personId = id;
  });

  /** создание обычного аккаунта */
  it('/account (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/account')
      .send(testAccountCreds)
      .expect(201);

    const { id, balance } = response.body;
    expect(balance).toBe(testAccountCreds.balance);
    testAccountId = id;
  })

  /** создание аккаунта под блокировку */
  it('/account (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/account')
      .send(testAccountToBlockCreds)
      .expect(201);

    const { id, balance } = response.body;
    expect(balance).toBe(testAccountToBlockCreds.balance);
    testAccountToBlockId = id;
  })

  /** получить инфо об аккаунте */
  it('/account/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/account/${testAccountId}`)
      .expect(200);

    const { personId, id, balance } = response.body;
    expect(balance).toBe(testAccountCreds.balance);
    expect(personId).toBe(testAccountCreds.personId);
    expect(id).toBe(testAccountId);
  });

  /** проверка баланса на аккаунте */
  it('/account/:id/balance (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/account/${testAccountId}/balance`)
      .expect(200);

    expect(response.body.balance).toBe(testAccountCreds.balance);
  });

});
