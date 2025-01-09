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
  const clientRepository = new InMemoryClientRepository();

  const resetPasswordUseCase = new ResetPasswordUseCase(clientRepository);

  return {
    givenSomeOneIsRegistered: async (client: IndividualClientJson) => {
      await clientRepository.save(IndividualClient.fromJsonToDataModel(client));
    },

    heCanResetHisPassword: async () => {},

    noErrorShouldBeThrown: () => {},
    thenPasswordShouldBeUpdated: async () => {},
  };
};

type Fixture = ReturnType<typeof createFixture>;
