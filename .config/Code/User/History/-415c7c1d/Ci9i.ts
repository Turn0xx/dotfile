import { PROVIDERS } from '../../../client/providers-strings';
import { TokensRepository } from '../../infrastructure/tokens.repository';
import { EmailValidationService } from '../application/email-validation.service';
import { SendGridEmailSender } from '../infrastructure/sendgrid.email-sender';

export const emailValidationServiceProvider = {
  provide: PROVIDERS.EMAIL_VALIDATION_SERVICE,
  useFactory: (
    sendingStrategy: SendGridEmailSender,
    tokenRepository: TokensRepository,
  ) => {
    return new EmailValidationService(tokenRepository, sendingStrategy);
  },
  inject: [SendGridEmailSender , PROVIDERS.TOKENS_REPOSITORY],
};
