import { Controller, Inject } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';
import { PROVIDERS } from '../providers-strings';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject(PROVIDERS.REGISTRATION_USE_CASE) private readonly registrationUseCase: RegistrationUseCase) {
    console.log('RegistrationController');
  }


}
