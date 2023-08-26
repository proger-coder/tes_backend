import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AccountModule } from '../../src/modules/account/account.module';

// тестируем на настоящих данных
describe('AccountController (e2e)', () => {
  let app: INestApplication;
  const realAccount = {
    id: '54da733f-2328-4ef3-9895-96af25f6ae58',
    personId: '3d1b1212-5f6b-4591-9ffa-12ca136aad36',
    balance: 183526.12,
    daily_withdrawal_limit: 500000,
    active: true,
    accountType: 1,
    createDate: '2023-08-26T11:50:42.806Z',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/:accountId (GET)', () => {
    return request(app.getHttpServer())
      .get(`/account/${realAccount.id}`)
      .expect(200)
      .expect((res) => {
        if (typeof res.body !== 'object') {
          throw new Error('Тело ответа не является объектом');
        }
        if (res.body.id !== realAccount.id) {
          throw new Error('id не совпадает c требуемым');
        }
      });
  });

  it('/:accountId/balance (GET)', () => {
    return request(app.getHttpServer())
      .get(`/account/${realAccount.id}/balance`)
      .expect(200)
      .then((response) => {
        expect(response.body.balance).toEqual(realAccount.balance);
      });
  });
});
