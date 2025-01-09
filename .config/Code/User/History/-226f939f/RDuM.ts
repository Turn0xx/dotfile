import { Inject, Injectable } from '@nestjs/common';
import { EmailSender } from '../application/email-sender';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';


@Injectable()
export class SendGridEmailSender implements EmailSender {
  constructor(private configService: ConfigService) {
    console.log('SendGridEmailSender created');
    sgMail.setApiKey(this.configService.get('SENGRID_API_KEY'));
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    const email = {
      to,
      from: this.configService.get('SENGRID_FROM_EMAIL'),
      subject,
      text: content,
    };

    await sgMail.send(email);
  }
}
