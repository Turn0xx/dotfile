import { Inject, Injectable } from "@nestjs/common";
import { EmailSender } from "./email-sender";
import { PROVIDERS } from "../../client/providers-strings";
import { ClientRepository } from "../../client/authentification/application/client.repository";
import { TokensRepository } from "./tokens.repository";

@Injectable()
export class EmailValidationService {

  constructor(
    @Inject('TokensRepository') private readonly tokensRepository: TokensRepository,
    private emailSender: EmailSender
    ) {
      console.log('EmailValidationService created' , this.clientRepository);
    }
 
  async execute(userId: number , email: string): Promise<boolean> {





    


    try {
      await this.emailSender.sendEmail(email, 'test', 'test');
      return true;
    } catch (error) {
      return false;
    }
  }
}