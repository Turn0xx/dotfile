import { EmailValidationService } from "../../../../notification-services/emails/application/email-validation.service";
import { PROVIDERS } from "../../../providers-strings";
import { ValidateTokenUseCase } from "../../application/usecases/validate-token.usecase";
import { ClientTypeOrmRepository } from "../../infrastructure/client.typeorm";

export const validateTokenUseCaseProvider = {
  provide: PROVIDERS.VALIDATE_TOKEN_USE_CASE,
  useFactory: (
    emailService: EmailValidationService,
    clientRepository: ClientTypeOrmRepository,
  ) => {
    return new ValidateTokenUseCase(emailService, clientRepository);
  },
  inject: [PROVIDERS.EMAIL_VALIDATOR, PROVIDERS.CLIENT_REPOSITORY],
};