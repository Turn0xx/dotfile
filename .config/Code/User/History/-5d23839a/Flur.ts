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

  }

  async sendNotification(type: "email" | "phone") {


    if (type === "email") {
      // send email
    } else {
      // send sms
    }
  }

  private sendSms() {
    // send sms
  }

  private sendEmail() {
    // send email
  }
}
