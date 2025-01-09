import { Body, Controller, Inject, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { RegistrationCommand, RegistrationUseCase } from './application/usecases/register.usecase';
import { PROVIDERS } from '../providers-strings';
import { EmailAlreadyExistException } from './errors/email-already-exist.error';
import { EmailAlreadyExistsError } from './errors/duplicateField.error';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async register(@Body() command: RegistrationCommand) {
    try {
      return this.registrationUseCase.handle(command);
    } catch (error) {
      console.log('erroooooooooooor'  );
      if (error instanceof EmailAlreadyExistsError) {
        throw new EmailAlreadyExistException(error);
      }

    }
  }


}