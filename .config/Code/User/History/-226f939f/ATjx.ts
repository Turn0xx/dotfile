import { Inject, Injectable } from '@nestjs/common';
import { EmailSender } from '../application/email-sender';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';


@Injectable()
export class SendGridEmailSender implements EmailSender {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    const email = {
      to,
      from: this.configService.get('SENDGRID_FROM_EMAIL'),
      subject,
      text: content,
      template_id: ''
    };

    await sgMail.send(email);
  }

  async sendEmailWithTemplate(
    to: string,
    templateId: string,
    dynamicTemplateData: any,
  ): Promise<void> {
    const email = {
      to,
      from: this.configService.get('SENDGRID_FROM_EMAIL'),
      templateId,
      dynamicTemplateData,
    };

    await sgMail.send(email);
  }
}