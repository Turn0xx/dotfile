import { TestingModule } from "@nestjs/testing";

describe('SendgridEmailSender', () => {

  let testModule: TestingModule;

  
  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [
      ],

      providers: [
      ],
    }).compile();
  }


});