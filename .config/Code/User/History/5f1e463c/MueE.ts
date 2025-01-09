import { Inject, Injectable } from '@nestjs/common';
import { EmailSender } from './email-sender';
import { PROVIDERS } from '../../client/providers-strings';
import { ClientRepository } from '../../client/authentification/application/repositories/client.repository';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class EmailValidationService {
  constructor(
    private readonly tokensRepository: TokensRepository,
    private emailSender: EmailSender,
  ) {}

  private generateToken(): string {
    const token = Math.random().toString(36).substring(2, 15);
    return token;
  }

  async generateEmail(userId: number, email: string): Promise<boolean> {
    const token = this.generateToken();

    try {
      await this.tokensRepository.insertToken(token, userId);
      await this.emailSender.sendEmail(email, 'Email Verification', `Your verification token is:${token}`);
      return true;
    } catch (error) {
      return false;
    }
  }


  async validateEmail(userId: number, token: string): Promise<void> {
    const throwError = (message: string) => {
      throw new Error(message);
    }

    console.log('userId', userId);
    try {
      const storedToken = await this.tokensRepository.getTokenByUserId(userId);
      console.log('storedToken', storedToken , token);
      storedToken === token ? true : throwError('Invalid token');
      console.log('storedToken', storedToken);
    } catch (error) {

      return error
    }
  }
}