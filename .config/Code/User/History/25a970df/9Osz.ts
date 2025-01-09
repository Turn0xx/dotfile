import { SmsSender } from '../../../../src/pocket-ticket/notification-services/sms/application/sms-sender';
import { ForgotPasswordService } from '../../../../src/pocket-ticket/notification-services/application/forgot-password.service';
import { clientBuilder } from '../../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { InMemoryTokensRepository } from '../../../../src/pocket-ticket/client/identity/test/tokens.in-memory';
import {
  IndividualClient,
  IndividualClientJson,
} from '../../../../src/pocket-ticket/client/identity/domain/individual-client';
import { FakeEmailSender } from '../../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { FakeSmsSender } from '../../../../src/pocket-ticket/notification-services/sms/test/sms-sender.fake';
import { ForgotPasswordUseCase } from '../../../../src/pocket-ticket/client/identity/application/usecases/forgot-password.usecase';
import { ClientJson } from '../../../../src/pocket-ticket/client/identity/domain/client';
import exp from 'constants';


import { test , describe , afterAll , beforeAll , beforeEach , afterEach } from 'vitest';

describe('Support Feature : Forgot Password', async () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();
  let testClient: IndividualClientJson;

  beforeEach(async () => {
    testClient = clBuilder
      .withEmail('lol@gmail.com')
      .withPhoneNumber('+33636518875')
      .toIndividualClient('John', 'Doe')
      .build();
    fixture = createFixture();
  });

  describe('Passing Scenario: Client forgot his password', () => {
    test('When Client forgot his password and uses email', async () => {
      await fixture.givenSomeOneIsRegistered(testClient);

      await fixture.whenClientForgotHisPasswordAndUsesEmail(
        testClient.id,
        testClient.email,
      );

      fixture.noErrorShouldBeThrown();

      await fixture.thenEmailShouldBeSentTo(testClient.email);

      await fixture.andDigitCodeShouldBeInserted(testClient.id);
    });
    test('When Client forgot his password and uses phone number', async () => {
      await fixture.givenSomeOneIsRegistered(testClient);

      await fixture.whenClientForgotHisPasswordAndUsesPhone(
        testClient.id,
        testClient.phoneNumber,
      );

      fixture.noErrorShouldBeThrown();

      await fixture.thenSmsShouldBeSentTo(testClient.phoneNumber);

      await fixture.andDigitCodeShouldBeInserted(testClient.id);
    });
  });

  describe('Failing Scenario: Client forgot his password', () => {
    test('When Client forgot his password and uses invalid email', async () => {
      await fixture.givenSomeOneIsRegistered(testClient);

      await fixture.whenClientForgotHisPasswordAndUsesEmail(
        testClient.id,
        'notHisEmail'
      );

      await fixture.thenErrorShouldBe(new Error('Validation failed'));
    });

    test
  });
});

const createFixture = () => {
  let throwError: Error;

  let clientRepository = new InMemoryClientRepository();
  let tokensRepository = new InMemoryTokensRepository();
  let emailSender = new FakeEmailSender();
  let smsSender = new FakeSmsSender();

  let forgotPasswordService = new ForgotPasswordService(
    emailSender,
    smsSender,
    tokensRepository,
  );

  let forgotPasswordUseCase = new ForgotPasswordUseCase(forgotPasswordService , clientRepository);

  let clBuilder = clientBuilder();

  return {
    givenSomeOneIsRegistered: async (client) => {
      const clientSchema = IndividualClient.fromJsonToDataModel(client);

      await clientRepository.insert(clientSchema);
    },

    whenClientForgotHisPasswordAndUsesEmail: async (
      id: number,
      identification: string,
    ) => {
      try {
        await forgotPasswordUseCase.handle({
          type: 'email',
          identification,
        });
      } catch (error) {
        throwError = error;
      }
    },

    whenClientForgotHisPasswordAndUsesPhone: async (
      id: number,
      identification: string,
    ) => {
      try {
        await forgotPasswordUseCase.handle({
          type: 'phone',
          identification,
        });
      } catch (error) {
        throwError = error;
      }
    },

    thenErrorShouldBe: (error: Error) => {
      expect(throwError.message).toBe(error.message);
    },

    noErrorShouldBeThrown: () => {
      console.log(throwError);
      expect(throwError).toBeUndefined();
    },

    thenEmailShouldBeSentTo: async (email: string) => {
      expect(emailSender.getEmailContent(email)).toBeDefined();
    },

    thenSmsShouldBeSentTo: async (phone: string) => {
      expect(smsSender.getSmsContent(phone)).toBeDefined();
    },

    andDigitCodeShouldBeInserted: async (clientId: number) => {
      console.log(tokensRepository.getDigitCodeByClientId(clientId));
      expect(await tokensRepository.getDigitCodeByClientId(clientId)).toBeDefined();
    }
  };
};

type Fixture = ReturnType<typeof createFixture>;
