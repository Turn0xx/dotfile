import { ValidateTokenUseCase } from '../../../src/pocket-ticket/client/identity/application/usecases/validate-token.usecase';
import {
  RegistrationCommand,
  registrationCommandBuilder,
} from '../../../src/pocket-ticket/client/identity/application/commands/registration.command';
import { RegistrationUseCase } from '../../../src/pocket-ticket/client/identity/application/usecases/register.usecase';
import { InMemoryClientRepository } from '../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { EmailSenderStub } from '../../../src/pocket-ticket/client/identity/test/email-sender.stub';
import { InMemoryTokensRepository } from '../../../src/pocket-ticket/client/identity/test/tokens.in-memory';
import { EmailValidationService } from '../../../src/pocket-ticket/emails/application/email-validation.service';
import { StubDateProvider } from '../../../src/pocket-ticket/tests/date.stub';
import { ValidationError } from 'class-validator';

describe('Basic Feature : Account Validation', async () => {
  let fixture: Fixture;
  let registrationCommandBuild = registrationCommandBuilder();

  let afterRegistration = async (): Promise<RegistrationCommand> => {
    const command = registrationCommandBuild
      .toIndividualClient('Alice', 'Doe')
      .build();

    fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
    await fixture.whenSomeOneRegisters(command);

    await fixture.thenEmailShouldBeSentTo(command.email);

    return command;
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
      const command = await afterRegistration();

      const token = fixture.getTokenFromEmail(command.email);

      await fixture.whenUserShouldValidateHisAccountWith(command.id, token);

      await fixture.thenHeShouldBeVerified(command.id);
    });

    it('When User Validates his account with a invalid token', async () => {
      const command = await afterRegistration();

      await fixture.whenUserShouldValidateHisAccountWith(command.id, '12345678900');

      fixture.thenErrorShouldBe(new Error('Invalid Token'));

    });


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

  let validateTokenUseCase = new ValidateTokenUseCase(
    emailValidator,
    clientRepository,
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
        await validateTokenUseCase.handle({ id: userId, token });
      } catch (error) {
        throwError = error;
      }
    },

    thenHeShouldBeVerified: async (userId: number) => {
      const client = await clientRepository.findById(userId);
      expect(client.IsVerified).toBe(true);
    },

    thenErrorShouldBe: (error: Error) => {
      expect(throwError).toBeDefined();
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
