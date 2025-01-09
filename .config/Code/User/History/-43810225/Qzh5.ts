import { EmailSender } from "../../notification-services/emails/application/email-sender";

export class EmailSenderStub implements EmailSender{
  
  public emailSents: Map<string , string> = new Map<string , string>(); 

  async sendEmail(to, subject, content) {
    this.emailSents.set(to, content);
    return Promise.resolve();
  }

  getEmailContent(to: string): string {
    return this.emailSents.get(to);
  }
}