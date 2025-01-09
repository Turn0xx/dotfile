import { EmailSender } from "../../../emails/application/email-sender";

export class EmailSenderStub implements EmailSender{
  
  public emailSents = [];

  async sendEmail(to, subject, content) {
    this.emailSents.push({to, subject, content});
    return Promise.resolve();
  }
}