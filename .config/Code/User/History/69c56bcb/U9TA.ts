import { Module } from '@nestjs/common';
import { RegistrationUseCase } from './authentification/application/usecases/register.usecase';
import { RealDateProvider } from './authentification/domain/date-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './authentification/infrastructure/organizer.schema';
import { Repository } from 'typeorm';
import { OrganizerTypeOrmRepository } from './authentification/infrastructure/organizer.typeorm';
import { AuthModule } from './authentification/Iden.module';

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
    organizerRepository: OrganizerTypeOrmRepository,
  ) => {
    return new RegistrationUseCase(dateProvider, organizerRepository);
  },
  inject: ['DATE_PROVIDER', 'ORGANIZER_REPOSITORY'],
};

@Module({
  imports: [AuthModule],
  providers: [
    Repository<OrganizerSchema>,
    OrganizerRepositoryProvider,
    dateProvider,
    registrationUseCaseProvider,
  ],
  controllers: [],
})
export class ClientModule {}
