import { TokensRepository } from './../infrastructure/tokens.repository';
import { SmsSender } from './../sms/application/sms-sender';
import { Injectable } from '@nestjs/common';
import { EmailSender } from '../emails/application/email-sender';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private emailSender: EmailSender,
    private smsSender: SmsSender,
    private tokensRepository: TokensRepository,
    private 
  ) {}

  private generateToken(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async sendNotification(
    type: 'email' | 'phone',
    identificator: string,
  ) {
    const code = this.generateToken();

    try {
      if (type === 'email') {
        await this.sendEmail({
          email: identificator,
          code,
        });
      } else {
        await this.sendSms({
          phoneNumber: identificator,
          code,
        });
      }

      await this.tokensRepository.insertDigitCode(code, clientId);
    } catch (error) {
      // return false;
      console.log(error);
    }
  }

  private async sendSms({ phoneNumber, code }) {
    this.smsSender.sendSms(phoneNumber, code);
  }

  private async sendEmail({ email, code }) {
    this.emailSender.sendEmail(
      email,
      'Password Reset',
      `Your code is: ${code}`,
    );
  }
}
