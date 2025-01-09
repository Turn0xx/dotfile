import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import e from "express";
import { SendGridEmailSender } from "src/pocket-ticket/emails/infrastructure/sendgrid.email-sender";

describe('SendgridEmailSender', () => {

  let testModule: TestingModule;
  let errorThrowed: Error;

  
  beforeEach(async () => {
    errorThrowed = null;
    testModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({})
      ],

      providers: [
        SendGridEmailSender
      ],
    }).compile();
  });

  test('should be defined', () => {
    const emailSender = testModule.get<SendGridEmailSender>(SendGridEmailSender);
    expect(emailSender).toBeDefined();
  });

  test('should send email', async () => {
    const emailSender = testModule.get<SendGridEmailSender>(SendGridEmailSender);

    try {
      await emailSender.sendEmail('elhilali.mad@gmail.com','test','test');
    } catch (error) {
      console.log({
        ...error
      });
      errorThrowed = error;
    }

    expect(errorThrowed).toBeNull();


  });

  afterAll(async () => {
    await testModule.close();
  });
});