import { SmsSender } from './../../../src/pocket-ticket/notification-services/sms/application/sms-sender';
import { ForgotPasswordService } from './../../../src/pocket-ticket/notification-services/application/forgot-password.service';
import { clientBuilder } from './../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { InMemoryTokensRepository } from '../../../src/pocket-ticket/client/identity/test/tokens.in-memory';
import {
  IndividualClient,
  IndividualClientJson,
} from '../../../src/pocket-ticket/client/identity/domain/individual-client';
import { FakeEmailSender } from '../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { FakeSmsSender } from '../../../src/pocket-ticket/notification-services/sms/test/sms-sender.fake';
import { ForgotPasswordUseCase } from '../../../src/pocket-ticket/client/identity/application/usecases/forgot-password.usecase';
import { ClientJson } from '../../../src/pocket-ticket/client/identity/domain/client';
describe('Support Feature : Forgot Password', async () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();

  beforeEach(async () => {
    fixture = createFixture();
  });

  describe('Scenario: Client forgot his password', () => {
    it('When Client forgot his password and uses email', async () => {
      let testClient: IndividualClientJson = clBuilder
        .withEmail('lol@gmail.com')
        .withPhoneNumber('+33636518875')
        .toIndividualClient('John', 'Doe')
        .build();

      await fixture.givenSomeOneIsRegistered(testClient);

      await fixture.whenClientForgotHisPasswordAndUsesEmail(
        testClient.id,
        testClient.email,
      );

      await fixture.thenEmailShouldBeSentTo(testClient.email);
    });
    it('When Client forgot his password and uses phone number', async () => {
      let testClient: IndividualClientJson = clBuilder
        .withEmail('lol@gmail.com')
        .withPhoneNumber('+33636518875')
        .toIndividualClient('John', 'Doe')
        .build();

      await fixture.givenSomeOneIsRegistered(testClient);

      await fixture.whenClientForgotHisPasswordAndUsesEmail(
        testClient.id,
        testClient.phoneNumber,
      );
    });
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

  let forgotPasswordUseCase = new ForgotPasswordUseCase(forgotPasswordService);

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
          clientId: id,
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
          clientId: id,
          type: 'phone',
          identification,
        });
      } catch (error) {
        throwError = error;
      }
    },

    thenErrorShouldBe: (error: Error) => {
      expect(throwError).toBeInstanceOf(error);
    },

    thenEmailShouldBeSentTo: async (email: string) => {
      expect(emailSender.getEmailContent(email)).toBeDefined();
    },

    thenSmsShouldBeSentTo: async (phone: string) => {
      expect(smsSender.getSmsContent(phone)).toBeDefined();
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
