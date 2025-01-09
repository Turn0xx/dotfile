export interface EmailSender {
  sendEmail(to: string, subject: string, content: string): Promise<void>;
}



