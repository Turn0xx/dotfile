import { Module } from '@nestjs/common';
import { RegistrationUseCase } from './authentification/application/usecases/register.usecase';
import { RealDateProvider } from './authentification/domain/date-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerSchema } from './authentification/infrastructure/organizer.schema';
import { Repository } from 'typeorm';
import { OrganizerTypeOrmRepository } from './authentification/infrastructure/organizer.typeorm';
import { IdentityModule } from './authentification/identity.module';


@Module({
  imports: [IdentityModule],
  providers: [
    Repository<OrganizerSchema>,
    OrganizerRepositoryProvider,
    dateProvider,
    registrationUseCaseProvider,
  ],
  controllers: [],
})
export class ClientModule {}
