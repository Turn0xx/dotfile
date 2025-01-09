import { Controller } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject('REGISTRATION_USE_CASE') private readonly registrationUseCase: RegistrationUseCase) {
    console.log('RegistrationController');
  }


}
