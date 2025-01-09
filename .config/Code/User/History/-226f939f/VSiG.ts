import { EmailSender } from '../application/email-sender';
import * as sgMail from '@sendgrid/mail';

export class SendGridEmailSender implements EmailSender {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const email = {
      to,
      from: '