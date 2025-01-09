import { Body, Controller, Inject, Post, HttpStatus } from '@nestjs/common';
import { RegistrationCommand, RegistrationUseCase } from './application/usecases/register.usecase';
import { PROVIDERS } from '../providers-strings';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {}

  HttpStatus
  @Post('')
  async register(@Body() command: RegistrationCommand) {
    try {
      return this.registrationUseCase.handle(command);
    } catch (error) {
      console.error(error);
      return error;
    }
  }


}