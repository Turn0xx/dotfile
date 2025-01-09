import { DynamicModule, Module } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from './domain/date-provider';
import { InMemoryOrganizerRepository } from '../../../tests/organizer.in-memory';
import { StubDateProvider } from 'tests/registration.spec';

const OrganizerRepositoryProvider = {
  provide: 'ORGANIZER_REPOSITORY',
  useFactory: () => {
    return new InMemoryOrganizerRepository();
  },
};

const dateProvider = {
  provide: 'DATE_PROVIDER',
  useFactory: () => {
    return new RealDateProvider();
  },
};

const registrationUseCaseProvider = {
  provide: 'REGISTRATION_USE_CASE',
  useFactory: (
    dateProvider: RealDateProvider,
    organizerRepository: InMemoryOrganizerRepository,
  ) => {
    return new RegistrationUseCase(dateProvider, organizerRepository);
  },
  inject: ['DATE_PROVIDER', 'ORGANIZER_REPOSITORY'],
};

@Module({
  imports: [],
  controllers: [],
})
export class ClientModule {
  public static forRoot(options: { testMode: boolean }): DynamicModule {
    return options.testMode == false
      ? {
          module: ClientModule,
          providers: [
            dateProvider,
            OrganizerRepositoryProvider,
            registrationUseCaseProvider,
          ],
        }
      : {
          module: ClientModule,
          providers: [
            {
              provide: 'FAKE_DATE_PROVIDER',
              useFactory: () => {
                return new StubDateProvider();
              },
            },
            OrganizerRepositoryProvider,
            {
              provide: 'REGISTRATION_USE_CASE_TEST',
              useFactory: (
                dateProvider: StubDateProvider,
                organizerRepository: InMemoryOrganizerRepository,
              ) => {
                return new RegistrationUseCase(
                  dateProvider,
                  organizerRepository,
                );
              },
              inject: ['FAKE_DATE_PROVIDER', 'ORGANIZER_REPOSITORY'],
            },
          ],
        };
  }
}
