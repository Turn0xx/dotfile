import { EmailSender } from '../application/email-sender';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

export class SendGridEmailSender implements EmailSender {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get('SENGRID_API_KEY'));
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    

  }
}
