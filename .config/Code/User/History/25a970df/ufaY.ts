import { SmsSender } from './../../../src/pocket-ticket/notification-services/sms/application/sms-sender';
import { ForgotPasswordService } from './../../../src/pocket-ticket/notification-services/application/forgot-password.service';
import { clientBuilder } from './../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { InMemoryTokensRepository } from '../../../src/pocket-ticket/client/identity/test/tokens.in-memory';
import { IndividualClient, IndividualClientJson } from '../../../src/pocket-ticket/client/identity/domain/individual-client';
import { FakeEmailSender } from '../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { FakeSmsSender } from '../../../src/pocket-ticket/notification-services/sms/test/sms-sender.fake';
import { ForgotPasswordUseCase } from '../../../src/pocket-ticket/client/identity/application/usecases/forgot-password.usecase';
import { ClientJson } from '../../../src/pocket-ticket/client/identity/domain/client';
describe('Support Feature : Forgot Password', async () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();

  let testClient = 

  beforeEach(async () => {
    
      const client: IndividualClientJson = clBuilder
        .withEmail(email)
        .withPhoneNumber(phone)
        .toIndividualClient('John', 'Doe')
        .build();
    fixture = createFixture();
  });

  describe('Scenario: Client forgot his password', () => {
    it('When Client forgot his password and uses email', async () => {
      await fixture.givenSomeOneIsRegistered(
        'lol@gmail.com',
        '+33636518875',
      )

      await fixture.whenClientForgotHisPasswordAndUsesEmail('1', '
    });
    it('When Client forgot his password and uses phone number', async () => {});
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
    givenSomeOneIsRegistered: async (email: string, phone: string) => {
      const clientSchema = IndividualClient.fromJsonToDataModel(client);

      await clientRepository.insert(clientSchema);
    },

    whenClientForgotHisPasswordAndUsesEmail: async (
      id: string,
      identification: string,
    ) => {
      try {
        await forgotPasswordUseCase.handle({
          clientId: id as any,
          type: 'email',
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
