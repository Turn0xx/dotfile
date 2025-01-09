import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegistrationCommand, RegistrationUseCase } from './application/usecases/register.usecase';
import { PROVIDERS } from '../providers-strings';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {}

  @Post('register')
  async register(@Body() body: RegistrationCommand) {
    try {
      return this.registrationUseCase.handle(body);
    } catch (error) {
      console.error(error);
      return error;
    }
  }


}