export class FakeSmsSender implements SmsSender{
  
  public smsSents: Map<string , string> = new Map<string , string>(); 

  async sendSms(to, content) {
    this.smsSents.set(to, content);
    return Promise.resolve();
  }

  getSmsContent(to: string): string {
    return this.smsSents.get(to);
  }
}