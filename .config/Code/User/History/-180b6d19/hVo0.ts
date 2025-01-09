import { dataBaseConfigModule } from '../../../../src/database.config';
import { RegistrationCommand, registrationCommandBuilder } from '../../../../src/pocket-ticket/client/identity/application/commands/registration.command';
import { RegistrationUseCase } from '../../../../src/pocket-ticket/client/identity/application/usecases/register.usecase';
import { StubDateProvider } from '../../../../src/shared/tests/date.stub';
import { Console } from 'console';
import { Client } from '../../../../src/pocket-ticket/client/identity/domain/client';
import { IndividualClient } from '../../../../src/pocket-ticket/client/identity/domain/individual-client';
import { EmailAlreadyExistsError, DuplicateFieldError } from '../../../../src/pocket-ticket/client/identity/errors/duplicateField.error';
import { clientBuilder } from '../../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../../src/pocket-ticket/client/identity/test/client.in-memory';
import { FakeEmailSender } from '../../../../src/pocket-ticket/notification-services/emails/test/email-sender.fake';
import { EmailValidationService } from '../../../../src/pocket-ticket/notification-services/emails/application/email-validation.service';
import { InMemoryTokensRepository } from '../../../../src/pocket-ticket/client/identity/test/tokens.in-memory';


import { test , describe , afterAll , beforeAll , beforeEach , afterEach } from 'vitest';

describe('Basic Feature : Registration', async () => {
  let fixture: Fixture;
  let registrationCommandBuild = registrationCommandBuilder();
  let clientBuild = clientBuilder();

  beforeEach(async () => {
    fixture = createFixture();
  });

  describe.concurrent('Individuals Scenarios', () => {
    describe.concurrent('Scenario: Client registers for an account', () => {
      test('Alice wants to register as an individual', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.whenAliceRegisters(
          registrationCommandBuild.toIndividualClient('Alice', 'Doe').build(),
        );

        await fixture.thenAliceShouldBeRegisteredAsIndividuel();
      });
    });

    describe.concurrent('Scenario: Client registers for an account with an existing unique field', () => {
      test('Alice wants to register as an individual with existing email', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.givenExistingIndividuals([
          IndividualClient.fromJson(
            clientBuild
              .toIndividualClient('Alice', 'Doe')
              .withEmail('email@gmail.com')
              .build(),
          ),
        ]);

        await fixture.whenAliceRegisters(
          registrationCommandBuild
            .toIndividualClient('Alice', 'Doe')
            .withEmail('email@gmail.com')
            .withId(2)
            .build(),
        );

        fixture.thenErrorShouldBe(EmailAlreadyExistsError);
      });

      test('Alice wants to register as an individual with existing phone number', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.givenExistingIndividuals([
          IndividualClient.fromJson(
            clientBuild
              .toIndividualClient('Alice', 'Doe')
              .withPhoneNumber('+33636518875')
              .build(),
          ),
        ]);

        await fixture.whenAliceRegisters(
          registrationCommandBuild
            .toIndividualClient('Alice', 'Doe')
            .withPhoneNumber('+33636518875')
            .withId(2)
            .build(),
        );

        fixture.thenErrorShouldBe(DuplicateFieldError);
      });
    });
  });
  describe.concurrent('Companies Scenarios', () => {
    describe.concurrent('Scenario: Client registers for an account', () => {
      test('Alice wants to register as a company', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.whenAliceRegisters(
          registrationCommandBuild.toCompanyClient('Alice Company').build(),
        );

        await fixture.thenAliceShouldBeRegisteredAsCompany();
      });
    });

    describe.concurrent('Scenario: Client registers for an account with an existing unique field', () => {
      test('Alice wants to register as a company with existing email', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.givenExistingIndividuals([
          IndividualClient.fromJson(
            clientBuild
              .toIndividualClient('Alice', 'Doe')
              .withEmail('email@gmail.com')
              .build(),
          ),
        ]);

        await fixture.whenAliceRegisters(
          registrationCommandBuild
            .toCompanyClient('Alice Company')
            .withEmail('email@gmail.com')
            .withId(2)
            .build(),
        );

        fixture.thenErrorShouldBe(EmailAlreadyExistsError);
      });

      test('Alice wants to register as a company with existing phone number', async () => {
        fixture.givenNowIs(new Date('2023-01-01T10:30:00.000Z'));
        await fixture.givenExistingIndividuals([
          IndividualClient.fromJson(
            clientBuild
              .toIndividualClient('Alice', 'Doe')
              .withPhoneNumber('+33636518875')
              .build(),
          ),
        ]);

        await fixture.whenAliceRegisters(
          registrationCommandBuild
            .toCompanyClient('Alice Company')
            .withPhoneNumber('+33636518875')
            .withId(2)
            .build(),
        );

        fixture.thenErrorShouldBe(DuplicateFieldError);
      });
    });
  });
});

const createFixture = () => {
  let throwError: Error;

  let dateProvider = new StubDateProvider();
  let clientRepository = new InMemoryClientRepository();
  let emailSender = new FakeEmailSender();
  let tokenRepository = new InMemoryTokensRepository();
  let emailValidator = new EmailValidationService(tokenRepository , emailSender);
  let registrationUseCase = new RegistrationUseCase(
    dateProvider,
    clientRepository,
    emailValidator,
  );

  return {
    givenExistingIndividuals: async (clients: IndividualClient[]) => {
      clients.forEach(async (client) => {
        await clientRepository.insert(client.toDataModel());
      });
    },

    thenErrorShouldBe(expectedThrownError: new (...args) => Error) {
      expect(throwError.name).toBe(expectedThrownError.name);
    },

    givenNowIs: (now: Date) => {
      dateProvider.now = now;
    },

    whenAliceRegisters: async (data: RegistrationCommand) => {
      try {
        await registrationUseCase.handle(data);
      } catch (error) {
        throwError = error;
      }
    },

    thenAliceShouldBeRegisteredAsIndividuel: async () => {
      // console.log(throwError);
      expect(throwError).toBeUndefined();

      const client: Client =
        await clientRepository.findByEmail('alice@gmail.com');

      const clientJson = client.toJson();

      expect(clientJson).toEqual(
        clientBuilder()
          .toIndividualClient('Alice', 'Doe')
          .withEmail('alice@gmail.com')
          .withPassword(clientJson.password)
          .build(),
      );
    },

    thenAliceShouldBeRegisteredAsCompany: async () => {
      // console.log(throwError.name);
      expect(throwError).toBeUndefined();

      const client: Client =
        await clientRepository.findByEmail('alice@gmail.com');

      const clientJson = client.toJson();

      expect(clientJson).toEqual(
        clientBuilder()
          .toCompanyClient('Alice Company')
          .withEmail('alice@gmail.com')
          .withPassword(clientJson.password)
          .build(),
      );
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
