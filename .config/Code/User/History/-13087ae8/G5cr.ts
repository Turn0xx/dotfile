import { EmailValidationService } from '../../emails/application/email-validation.service';
import { Module, Injectable } from '@nestjs/common';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/local.strategy';
import { RegistrationController } from './application/controllers/registration.controller';
import { Repository } from 'typeorm';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from './domain/date-provider';
import { PROVIDERS } from '../providers-strings';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EmailsModule} from '../../emails/emails.module';
import { ClientSchema } from '../../infrastructure/client.schema';
import { ClientTypeOrmRepository } from './infrastructure/client.typeorm';

const ClientRepositoryProvider = {
  provide: PROVIDERS.CLIENT_REPOSITORY,
  useFactory: (organizerRepository: Repository<ClientSchema>) => {
    return new ClientTypeOrmRepository(organizerRepository);
  },
  inject: [getRepositoryToken(ClientSchema)],
};

const dateProvider = {
  provide: PROVIDERS.DATE_PROVIDER,
  useFactory: () => {
    return new RealDateProvider();
  },
};


const registrationUseCaseProvider = {
  provide: PROVIDERS.REGISTRATION_USE_CASE,
  useFactory: (
    dateProvider: RealDateProvider,
    organizerRepository: ClientTypeOrmRepository,
    emailValidator: EmailValidationService
  ) => {
    return new RegistrationUseCase(dateProvider, organizerRepository , emailValidator);
  },
  inject: [PROVIDERS.DATE_PROVIDER, PROVIDERS.CLIENT_REPOSITORY , PROVIDERS.EMAIL_VALIDATOR],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientSchema]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret',//TODO: move to env
      signOptions: { expiresIn: '60s' },
    }),
    EmailsModule
  ],
  providers: [
    AuthService,
    ClientRepositoryProvider,
    dateProvider,
    registrationUseCaseProvider,
    LocalStrategy,
  ],
  controllers: [AuthController, RegistrationController, Iden],
})
export class IdentityModule {}
