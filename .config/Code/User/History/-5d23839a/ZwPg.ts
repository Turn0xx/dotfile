import { SmsSender } from './../sms/application/sms-sender';
import { Injectable } from '@nestjs/common';
import { EmailSender } from '../emails/application/email-sender';

@Injectable()
export class ForgotPasswordService {
  constructor(
    emailSender: EmailSender,
    SmsSender: SmsSender,    
  ) {}

  private generateToken(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async sendNotification(type: "email" | "phone" , identificator: string) {

    const code = this.generateToken();

    try {
      if (type === "email") {
        this.sendEmail({
          email: identificator,
          code,
        });
      } else {
        this.sendSms({
          phoneNumber: identificator,
          code,
        });
      }
    } catch (error) {
      // return false;
      console.log(error);
    }
 
  }

  private async sendSms({
    phoneNumber,
    code,
  }) {
    // send sms
  }

  private async sendEmail({
    email,
    code,
  }) {
    // send email
  }
}
