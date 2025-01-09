import { ValidateTokenUseCase } from './application/usecases/validate-token.usecase';
import { EmailValidationService } from '../../notification-services/emails/application/email-validation.service';
import { Module } from '@nestjs/common';
import { RegistrationController } from './framework/controllers/registration.controller';
import { Repository } from 'typeorm';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { RealDateProvider } from '../../../shared/date-provider';
import { PROVIDERS } from '../providers-strings';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmailsModule } from '../../notification-services/emails/emails.module';
import { ClientSchema } from '../../infrastructure/client.schema';
import { ClientTypeOrmRepository } from './infrastructure/client.typeorm';
import { IdentityController } from './framework/controllers/identity.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../authentification/framework/auth.module';
import { NotificationsModule } from '../../notification-services/notification.module';
import { dateProvider } from '../../../shared/framework/date.provider';
import { clientRepositoryProvider } from './framework/providers/client-repository.provider';
import { registrationUseCaseProvider } from './framework/providers/registration-usecase.provider';
import { validateTokenUseCaseProvider } from './framework/providers/validate-token-usecase.provider';



@Module({
  imports: [TypeOrmModule.forFeature([ClientSchema]), NotificationsModule],
  providers: [
    clientRepositoryProvider,
    registrationUseCaseProvider,
    validateTokenUseCaseProvider,
    dateProvider,
  ],
  controllers: [RegistrationController, IdentityController],
  exports: [clientRepositoryProvider],
})
export class IdentityModule {}
