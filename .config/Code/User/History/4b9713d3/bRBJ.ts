import { RegistrationCommand } from "../../../src/pocket-ticket/client/authentification/application/commands/registration.command";
import { RegistrationUseCase } from "../../../src/pocket-ticket/client/authentification/application/usecases/register.usecase";
import { InMemoryClientRepository } from "../../../src/pocket-ticket/client/authentification/test/client.in-memory";
import { EmailSenderStub } from "../../../src/pocket-ticket/client/authentification/test/email-sender.stub";
import { InMemoryTokensRepository } from "../../../src/pocket-ticket/client/authentification/test/tokens.in-memory";
import { EmailValidationService } from "../../../src/pocket-ticket/emails/application/email-validation.service";
import { StubDateProvider } from "../../../src/pocket-ticket/tests/date.stub";




describe('Basic Feature : Account Validation', async () => {

});


const createFixture = () => {


  let throwError: Error;

  let dateProvider = new StubDateProvider();
  let clientRepository = new InMemoryClientRepository();
  let emailSender = new EmailSenderStub();
  let tokenRepository = new InMemoryTokensRepository();
  let emailValidator = new EmailValidationService(tokenRepository , emailSender);
  let registrationUseCase = new RegistrationUseCase(
    dateProvider,
    clientRepository,
    emailValidator,
  );
 
  return {

    

    whenSomeOneRegisters: async (
      registrationCommand: RegistrationCommand
    ) => {
      await registrationUseCase.handle(registrationCommand);
    } ,

    thenEmailShouldBeSentTo: async (email: string) => {
      expect(emailSender.emailSents.has(email)).toBe(true);
    } ,

    getTokenFromEmail: async (email: string) => {
      return emailSender.emailSents.get(email).split(':')[1];
    }

    and: async (content: string) => {
      
    }

    



  }
}


