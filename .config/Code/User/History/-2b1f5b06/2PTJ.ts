import { Body, Controller, Inject, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { RegistrationUseCase } from '../usecases/register.usecase';
import { PROVIDERS } from '../../../providers-strings';
import { EmailAlreadyExistException } from '../../errors/email-already-exist.exception';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import { RegistrationCommand } from '../commands/registration.command';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async register(@Body() command: RegistrationCommand) {
    try {
      return await this.registrationUseCase.handle(command);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        throw new EmailAlreadyExistException(error);
      }

    }
  }


}