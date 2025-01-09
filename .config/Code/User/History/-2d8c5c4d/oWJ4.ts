import { RealDateProvider } from '../../../../../shared/date-provider';
import { EmailValidationService } from '../../../../notification-services/emails/application/email-validation.service';
import { PROVIDERS } from '../../../providers-strings';
import { RegistrationUseCase } from '../../application/usecases/register.usecase';
import { ClientTypeOrmRepository } from '../../infrastructure/client.typeorm';

export const registrationUseCaseProvider = {
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
    PROVIDERS.EMAIL_VALIDATION_SERVICE,
  ],
};
