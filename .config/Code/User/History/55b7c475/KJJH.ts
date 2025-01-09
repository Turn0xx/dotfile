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

  afterAll(async () => {
    await testModule.close();
  });
});