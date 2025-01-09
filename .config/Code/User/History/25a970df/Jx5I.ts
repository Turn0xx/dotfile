import { SmsSender } from './../../../src/pocket-ticket/notification-services/sms/application/sms-sender';
import { ForgotPasswordService } from './../../../src/pocket-ticket/notification-services/application/forgot-password.service';
import { clientBuilder } from './../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { InMemoryTokensRepository } from '../../../src/pocket-ticket/client/identity/test/tokens.in-memory';
import { IndividualClient } from '../../../src/pocket-ticket/client/identity/domain/individual-client';
import { FakeEmailSender } from '../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { FakeSmsSender } from '../../../src/pocket-ticket/notification-services/sms/test/sms-sender.fake';
import { ForgotPasswordUseCase } from '../../../src/pocket-ticket/client/identity/application/usecases/forgot-password.usecase';
describe('Support Feature : Forgot Password', async () => {});

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
    givenSomeOneIsRegistered: async (email: string, phone: string) => {
      const client = clBuilder
        .withEmail(email)
        .withPhoneNumber(phone)
        .toIndividualClient('John', 'Doe')
        .build();
      const clientSchema = IndividualClient.fromJsonToDataModel(client);

      await clientRepository.insert(clientSchema);
    },

    whenClientForgotHisPassword: async (
      id: string,
      identification: string,
      type: 'email' | 'phone',
    ) => {
      try {
        await forgotPasswordUseCase.handle({
          clientId: id as any,
          type,
          identification,
        });
      } catch (error) {
        throwError = error;
      }
    },

    thenErrorShouldBe: (error: Error) => {
      expect(throwError).toBeInstanceOf(error);
    },

    then
  };
};
