import { IndividualClientJson } from "../../../../src/pocket-ticket/client/identity/domain/individual-client";
import { clientBuilder } from "../../../../src/pocket-ticket/client/identity/test/builders/client.builder";
import { InMemoryClientRepository } from "../../../../src/pocket-ticket/client/identity/test/client.in-memory";











describe('Support Feature: Client resets password', () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();
  let testClient: IndividualClientJson;



  
});

const createFixture = () => {

  const clientRepository = new InMemoryClientRepository();
  


  return {
    givenSomeOneIsRegistered: async (client: IndividualClientJson) => {
      await clientRepository.save(client);
    },
    whenClientUsesForgotPasswordUseCase: async (id: number, email: string) => {},
    noErrorShouldBeThrown: () => {},
    heCanResetHisPassword: async () => {},
    thenPasswordShouldBeUpdated: async () => {},
  };

}

type Fixture = ReturnType<typeof createFixture>;