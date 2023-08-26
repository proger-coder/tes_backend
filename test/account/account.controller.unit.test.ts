import { AccountController } from '../../src/modules/account/account.controller';
import { AccountService } from '../../src/modules/account/account.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { TransactionService } from '../../src/modules/transaction/transaction.service';
import { IpWhitelistService } from '../../src/services/ip-whitelist.service';

/** Группа юнит-тестов для AccountController */
describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        PrismaService,
        TransactionService,
        IpWhitelistService,
      ],
    }).compile();

    //accountService = moduleRef.resolve(AccountService);
    accountService = moduleRef.get<AccountService>(AccountService);
    accountController = moduleRef.get<AccountController>(AccountController);
  });

  describe('создание аккаунта', () => {
    it('должен создать аккаунт', async () => {
      const mockAccCreateData = {
        personId: '1-2-3',
        balance: 1000,
        daily_withdrawal_limit: 300,
        active: true,
        accountType: 1,
        createDate: new Date(),
      };
      // подменяем реальный метод сервиса (accountService.create)
      jest
        .spyOn(accountService, 'create')
        .mockImplementation(() =>
          Promise.resolve({ id: '1', ...mockAccCreateData }),
        );

      expect(await accountController.create(mockAccCreateData)).toEqual({
        id: '1',
        ...mockAccCreateData,
      });
    });
  });

  describe('получение баланса', () => {
    it('должен вернуть объект с балансом аккаунта', async () => {
      const mockBalance = 1000;
      // подменяем реальный метод сервиса (accountService.getBalance)
      jest
        .spyOn(accountService, 'getBalance')
        .mockImplementation(() => Promise.resolve(mockBalance));

      expect(await accountController.getBalance('1-2-3')).toEqual({
        balance: mockBalance,
      });
    });
  });
});
