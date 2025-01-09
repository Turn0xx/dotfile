import { IndividualClientJson } from "../../../../src/pocket-ticket/client/identity/domain/individual-client";
import { clientBuilder } from "../../../../src/pocket-ticket/client/identity/test/builders/client.builder";











describe('Support Feature: Client resets password', () => {
  let fixture: Fixture;
  let clBuilder = clientBuilder();
  let testClient: IndividualClientJson;



  
});

const createFixture = () => {

  


  return {
    givenSomeOneIsRegistered: async (client: IndividualClientJson) => {

    },
    whenClientUsesForgotPasswordUseCase: async (id: number, email: string) => {},
    noErrorShouldBeThrown: () => {},
    heCanResetHisPassword: async () => {},
    thenPasswordShouldBeUpdated: async () => {},
  };

}

type Fixture = ReturnType<typeof createFixture>;