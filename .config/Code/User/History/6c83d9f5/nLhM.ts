import { ValidateTokenUseCase } from './application/usecases/validate-token.usecase';
import { EmailValidationService } from '../../emails/application/email-validation.service';
import { Module, Injectable } from '@nestjs/common';
import { AuthController } from '../authentification/framework/auth.controller';
import { AuthService } from '../authentification/framework/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/local.strategy';
import { RegistrationController } from './application/controllers/registration.controller';
import { Repository } from 'typeorm';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from './domain/date-provider';
import { PROVIDERS } from '../providers-strings';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EmailsModule } from '../../emails/emails.module';
import { ClientSchema } from '../../infrastructure/client.schema';
import { ClientTypeOrmRepository } from './infrastructure/client.typeorm';
import { IdentityController } from './application/controllers/identity.controller';
import { GoogleStrategy } from './application/google.strategy';
import { ConfigModule } from '@nestjs/config';

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
    emailValidator: EmailValidationService,
  ) => {
    return new RegistrationUseCase(
      dateProvider,
      organizerRepository,
      emailValidator,
    );
  },
  inject: [
    PROVIDERS.DATE_PROVIDER,
    PROVIDERS.CLIENT_REPOSITORY,
    PROVIDERS.EMAIL_VALIDATOR,
  ],
};

const validateTokenUseCaseProvider = {
  provide: PROVIDERS.VALIDATE_TOKEN_USE_CASE,
  useFactory: (
    emailService: EmailValidationService,
    clientRepository: ClientTypeOrmRepository,
  ) => {
    return new ValidateTokenUseCase(emailService, clientRepository);
  },
  inject: [PROVIDERS.EMAIL_VALIDATOR, PROVIDERS.CLIENT_REPOSITORY],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientSchema]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret', //TODO: move to env
      signOptions: { expiresIn: '1d' },
    }),
    EmailsModule,
    ConfigModule,
  ],
  providers: [
    AuthService,
    ClientRepositoryProvider,
    dateProvider,
    registrationUseCaseProvider,
    validateTokenUseCaseProvider,
    LocalStrategy,
    GoogleStrategy
  ],
  controllers: [AuthController, RegistrationController, IdentityController],
})
export class IdentityModule {}
