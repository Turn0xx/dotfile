import exp from 'constants';
import { ResetPasswordCommand } from '../../../../src/pocket-ticket/client/identity/application/commands/reset-password.command';
import { ResetPasswordUseCase } from '../../../../src/pocket-ticket/client/identity/application/usecases/reset-password.usecase';
import {
  IndividualClient,
  IndividualClientJson,
} from '../../../../src/pocket-ticket/client/identity/domain/individual-client';
import { clientBuilder } from '../../../../src/pocket-ticket/client/identity/test/builders/client.builder';
import { InMemoryClientRepository } from '../../../../src/pocket-ticket/client/identity/test/client.in-memory';

describe('Support Feature: Client resets password', () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();
  let testClient: IndividualClientJson;
});

const createFixture = () => {
  let thrownError: Error | null = null;

  const clientRepository = new InMemoryClientRepository();

  const resetPasswordUseCase = new ResetPasswordUseCase(clientRepository);

  return {
    givenSomeOneIsRegistered: async (client: IndividualClientJson) => {
      await clientRepository.save(IndividualClient.fromJsonToDataModel(client));
    },

    heCanResetHisPassword: async (command: ResetPasswordCommand) => {
      try {
        resetPasswordUseCase.handle(command);
      } catch (error) {
        thrownError = error;
      }

    },

    noErrorShouldBeThrown: () => {
      expect(thrownError).toBeNull();
    },

    thenErrorShouldBeThrown: (error: Error) => {
      expect(thrownError).toBe(error);
    },

    thenPasswordShouldBeUpdated: async (
      email: string,
      newPassowrd: string,
    ) => {
      const client = await clientRepository.findByEmail(email);
      expect(client.).toBe(newPassowrd);
      
      

    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
