import {
  RegistrationCommand,
  registrationCommandBuilder,
} from '../../../src/pocket-ticket/client/authentification/application/commands/registration.command';
import { RegistrationUseCase } from '../../../src/pocket-ticket/client/authentification/application/usecases/register.usecase';
import { InMemoryClientRepository } from '../../../src/pocket-ticket/client/authentification/test/client.in-memory';
import { EmailSenderStub } from '../../../src/pocket-ticket/client/authentification/test/email-sender.stub';
import { InMemoryTokensRepository } from '../../../src/pocket-ticket/client/authentification/test/tokens.in-memory';
import { EmailValidationService } from '../../../src/pocket-ticket/emails/application/email-validation.service';
import { StubDateProvider } from '../../../src/pocket-ticket/tests/date.stub';

describe('Basic Feature : Account Validation', async () => {
  let fixture: Fixture;
  let registrationCommandBuild = registrationCommandBuilder();

  let afterRegistration = async () => {
    const command = registrationCommandBuild
      .toIndividualClient('Alice', 'Doe')
      .build();

    fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
    await fixture.whenSomeOneRegisters(command);

    await fixture.thenEmailShouldBeSentTo(command.email);
  };

  beforeEach(async () => {
    fixture = createFixture();
  });

  describe('Scenario: Client validates his account', () => {
    it('When User Register he receives an email', async () => {
      const command = registrationCommandBuild
        .toIndividualClient('Alice', 'Doe')
        .build();

      fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
      await fixture.whenSomeOneRegisters(command);

      await fixture.thenEmailShouldBeSentTo(command.email);
    });

    it('When User Validates his account with a valid token', async () => {
      await afterRegistration();

      const token = fixture.getTokenFromEmail('
  });
});

const createFixture = () => {
  let throwError: Error;

  let dateProvider = new StubDateProvider();
  let clientRepository = new InMemoryClientRepository();
  let emailSender = new EmailSenderStub();
  let tokenRepository = new InMemoryTokensRepository();
  let emailValidator = new EmailValidationService(tokenRepository, emailSender);
  let registrationUseCase = new RegistrationUseCase(
    dateProvider,
    clientRepository,
    emailValidator,
  );

  return {
    givenNowIs: (date: Date) => {
      dateProvider.now = date;
    },

    whenSomeOneRegisters: async (registrationCommand: RegistrationCommand) => {
      await registrationUseCase.handle(registrationCommand);
    },

    thenEmailShouldBeSentTo: async (email: string) => {
      expect(emailSender.emailSents.has(email)).toBe(true);
    },

    getTokenFromEmail: (email: string) => {
      return emailSender.emailSents.get(email).split(':')[1];
    },


    whenUserShouldValidateHisAccountWith: async (
      userId: number,
      token: string,
    ) => {
      try {
        await emailValidator.validateEmail(1, token);
      } catch (error) {
        throwError = error;
      }
    },

    thenHeShouldBeVerified: async (userId: number) => {
      const client = await clientRepository.findById(userId);
      expect(client.IsVerified).toBe(true);
    },

    thenErrorShouldBe: (error: Error) => {
      expect(throwError).toBeInstanceOf(error);
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;