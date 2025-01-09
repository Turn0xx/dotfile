import {
  Body,
  Controller,
  Inject,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RegistrationUseCase } from '../../application/usecases/register.usecase';
import { PROVIDERS } from '../../../providers-strings';
import { EmailAlreadyExistException } from '../../errors/email-already-exist.exception';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import { RegistrationCommand } from '../../application/commands/registration.command';
import { Public } from '../../../authentification/framework/public.strategy';
import { DateProvider } from '../../../../../shared/date-provider';
import { EmailValidationService } from '../../../../notification-services/emails/application/email-validation.service';
import { ClientRepository } from '../../application/client.repository';

@Controller('registration')
export class RegistrationController {
  constructor(
    @Inject(PROVIDERS.DATE_PROVIDER)
    private readonly dateProvider: DateProvider,

    @Inject(PROVIDERS.CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,

    @Inject(PROVIDERS.EMAIL_VALIDATION_SERVICE)
    private readonly emailValidationService: EmailValidationService,


  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async register(@Body() command: RegistrationCommand) {
    try {
      const useCase = new RegistrationUseCase();

      return await this.registrationUseCase.handle(command);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        throw new EmailAlreadyExistException(error);
      }
    }
  }
}
