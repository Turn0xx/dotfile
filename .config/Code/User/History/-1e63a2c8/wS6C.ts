import { DateProvider } from '../domain/date-provider';
import {
  RegistrationCommand,
  RegistrationUseCase,
} from '../application/usecases/register.usecase';
import { InMemoryOrganizerRepository } from './organizer.in-memory';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientModule } from '../client.module';

export class StubDateProvider implements DateProvider {
  now: Date;
  getNow(): Date {
    return this.now;
  }
}

describe('Basic Feature : Registration', async () => {
  let fixture: Fixture;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [ClientModule.forRoot(true)],
    }).compile();

    fixture = createFixture(testModule);
  });

  describe('Scenario: User registers for an account', () => {
    it('Alice wants to register as an organizer', () => {
      fixture.givenNowIs(new Date(2021, 1, 1));
      fixture.whenAliceRegisters({
        name: 'Alice',
        email: 'alice@gmail.com',
        password: '12345678',
      });

      fixture.thenAliceShouldBeRegistered();
    });
  });
});

const createFixture = (di: TestingModule) => {
  let throwError: Error;

  let dateProvider = di.get<StubDateProvider>('DATE_PROVIDER');
  let organizerRepository = di.get<InMemoryOrganizerRepository>('ORGANIZER_REPOSITORY')
  let registrationUseCase = di.get<RegistrationUseCase>('REGISTRATION_USE_CASE');

  return {
    givenNowIs: (now: Date) => {
      dateProvider.now = now;
    },

    whenAliceRegisters: (data: RegistrationCommand) => {
      try {
        registrationUseCase.handle(data);
      } catch (error) {
        throwError = error;
      }
    },

    thenAliceShouldBeRegistered: () => {
      expect(throwError).toBeUndefined();
      organizerRepository.findByEmail('alice@gmail.com').then((organizer) => {
        expect(organizer.password).toEqual('12345678');
      });
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
