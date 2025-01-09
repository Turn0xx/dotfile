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

  async sendNotification(type: "email" | "phone") {

    const code = this.generateToken();

    try {
      if (type === "email") {
        this.sendEmail();
      } else {
        // send sms
      }
    } catch (error) {
      // return false;
      console.log(error);
    }
 
  }

  private async sendSms() {
    // send sms
  }

  private async sendEmail() {
    // send email
  }
}
