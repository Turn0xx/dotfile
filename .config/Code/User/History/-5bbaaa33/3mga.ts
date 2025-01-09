import { EmailSender } from "../../../emails/application/email-sender";

export class EmailSenderStub implements EmailSender{
  
  public emailSents: Map<string , string> = new Map<string , string>(); 

  async sendEmail(to, subject, content) {
    this.emailSents.push();
    return Promise.resolve();
  }
}