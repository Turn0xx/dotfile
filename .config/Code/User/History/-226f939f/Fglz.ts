

export class SendGridEmailSender implements EmailSender {
  constructor(private sendGridClient: SendGridClient) {}

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const email = {
      to,
      from: '