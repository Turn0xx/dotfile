import { SmsSender } from './../sms/application/sms-sender';
import { Injectable } from '@nestjs/common';
import { EmailSender } from '../emails/application/email-sender';

@Injectable()
export class ForgotPasswordService {
  constructor(
    emailSender: EmailSender,
    SmsSender: SmsSender,    
  ) {}

  async sendNotification(type: ) {}
}
