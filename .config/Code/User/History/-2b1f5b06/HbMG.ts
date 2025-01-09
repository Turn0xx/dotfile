import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { PROVIDERS } from '../providers-strings';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {}

  @Post('register')
  async register(@Body() body) {
    return this.registrationUseCase.handle(body);
  }


}