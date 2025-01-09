import { EmailSender } from "src/pocket-ticket/emails/application/email-sender";

export class EmailSenderStub implements EmailSender{
  async sendEmail(to, subject, content) {
    return Promise.resolve();
  }
}