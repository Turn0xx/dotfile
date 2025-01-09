import { EmailSender } from '../application/email-sender';

export class FakeEmailSender implements EmailSender {
  public emailSents: Map<string, string> = new Map<string, string>();

  async sendEmail(to, subject, content) {
    console.log(`Sending email to ${to} with subject ${subject} and content ${content}`);
    this.emailSents.set(to, content);
    return Promise.resolve();
  }

  getEmailContent(to: string): string {
    return this.emailSents.get(to);
  }
}
