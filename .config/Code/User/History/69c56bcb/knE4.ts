import { DynamicModule, Module } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from './domain/date-provider';
import { InMemoryOrganizerRepository, StubDateProvider } from './test/organizer.in-memory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './infrastructure/organizer.schema';
import { Repository } from 'typeorm';
import { OrganizerTypeOrmRepository } from './infrastructure/organizer.typeorm';

const OrganizerRepositoryProvider = {
  provide: 'ORGANIZER_REPOSITORY',
  useFactory: (organizerRepository: Repository<OrganizerSchema>) => {
    return new OrganizerTypeOrmRepository(organizerRepository);
  },
  inject: [Repository<OrganizerSchema>],  

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
  imports: [
    TypeOrmModule.forFeature([OrganizerSchema]),
  ],
  providers: [OrganizerRepositoryProvider, dateProvider, registrationUseCaseProvider],
  controllers: [],
})
export class ClientModule {}
