import { EmailSender } from "../../../emails/application/email-sender";

export class EmailSenderStub implements EmailSender{
  async sendEmail(to, subject, content) {
    return Promise.resolve();
  }
}