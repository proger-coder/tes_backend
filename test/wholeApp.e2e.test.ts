import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateClientDTO } from "../src/modules/client/DTO/CreateClientDTO";
import { AccountModule } from "../src/modules/account/account.module";
import { ClientModule } from "../src/modules/client/client.module";
import { TransactionModule } from "../src/modules/transaction/transaction.module";
import { CreateAccountDTO, UpdateBalanceDTO } from "../src/modules/account/DTO";
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

  const testUpdateBalanceDepo:UpdateBalanceDTO = {
    accountId: "не-был-установлен",
    value: 100
  }

  const testUpdateBalanceWithdrawal:UpdateBalanceDTO = {
    accountId: "не-был-установлен",
    value: -1000
  }

  const testTransactionDeposit:TransactionDTO = {
    accountId: "не-был-установлен",
    value: 0,
    transactionDate: new Date()
  }

  const testTransactionWithdrawal:TransactionDTO = {
    accountId: "не-был-установлен",
    value: 0,
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
    console.log(`testAccountId = `, testAccountId);
    console.log(`testUpdateBalanceDepo = `, testUpdateBalanceDepo);
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

  /** накинуть денег на аккаунт */
  it('/account (PATCH)', async () => {
    testUpdateBalanceDepo.accountId = testAccountId;

    const response = await request(app.getHttpServer())
      .patch(`/account/balance`)
      .send(testUpdateBalanceDepo)
      .expect(200);

    expect(response.body.balance).toBe(testAccountCreds.balance + testUpdateBalanceDepo.value);

    testTransactionDeposit.accountId = testAccountId;
    testTransactionDeposit.value = testUpdateBalanceDepo.value;
  })

  /** проверить, что транзакция записалась автоматически */
  it('/transaction/history (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/transaction/history/${testAccountId}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].accountId).toBe(testAccountId);
    console.log('transaction history', response.body);
  })

  /** записать транзакцию вручную */
  it('/transaction (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/transaction')
      .send(testTransactionDeposit)
      .expect(201);

    expect(response.body.accountId).toBe(testAccountId);
    expect(response.body.value).toBe(testTransactionDeposit.value);
  })

  /** снять больше денег, чем есть на аккаунте */
  it('/account (PATCH)', async () => {
    testUpdateBalanceWithdrawal.accountId = testAccountId;

    const response = await request(app.getHttpServer())
      .patch(`/account/balance`)
      .send(testUpdateBalanceWithdrawal)
      .expect(400);
  })

  /** заблокировать аккаунт */
  it('/account/block (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/account/block')
      .send({accountId:testAccountToBlockId})
      .expect(200);

    const {active} = response.body;
    expect(active).toBeFalsy()
  })

  /** снять деньги с заблокированного аккаунта */
  it('/account (PATCH)', async () => {
    testUpdateBalanceWithdrawal.accountId = testAccountToBlockId;

    const response = await request(app.getHttpServer())
      .patch(`/account/balance`)
      .send(testUpdateBalanceWithdrawal)
      .expect(403);
  })

  /** добавить IP в белый список */
  it('/account/whitelist (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/account/whitelist')
      .send({ip: newWhiteIP})
      .expect(201);
  })

  /** удолить IP из белава списка */
  it('/account/whitelist (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/account/whitelist')
      .send({ip: newWhiteIP})
      .expect(200);
  })
});
