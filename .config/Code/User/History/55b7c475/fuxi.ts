import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { SendGridEmailSender } from "src/pocket-ticket/emails/infrastructure/sendgrid.email-sender";

describe('SendgridEmailSender', () => {

  let testModule: TestingModule;

  
  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({})
      ],

      providers: [
        SendGridEmailSender
      ],
    }).compile();
  });

  it('should be defined', () => {
    const emailSender = testModule.get<SendGridEmailSender>(SendGridEmailSender);
    expect(emailSender).toBeDefined();
  });

  it('should send email', async () => {
    const emailSender = testModule.get<SendGridEmailSender>(SendGridEmailSender);
    await emailSender.sendEmail('elhilali.mad@gmail.com','test','test');
  });

  afterAll(async () => {
    await testModule.close();
  });
});