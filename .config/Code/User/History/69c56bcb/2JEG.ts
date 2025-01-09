import { DynamicModule, Module } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from './domain/date-provider';
import { InMemoryOrganizerRepository, StubDateProvider } from './test/organizer.in-memory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema, OrganizerTypeOrmRepository } from './infrastructure/organizer.typeorm';
import { Repository } from 'typeorm';

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
  imports: [TypeOrmModule.forFeature([OrganizerSchema])],
  controllers: [],
})
export class ClientModule {
  public static forRoot(options: { testMode: boolean }): DynamicModule {
    return options.testMode == false
      ? {
          module: ClientModule,
          imports: [TypeOrmModule.forFeature([OrganizerSchema])],
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
            {
              provide: 'ORGANIZER_REPOSITORY',
              useFactory: () => {

                return new OrganizerTypeOrmRepository();
              },
              inject : [Repository<OrganizerSchema>]
            },
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
