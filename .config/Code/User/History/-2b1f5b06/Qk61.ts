import { Controller, Inject } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('registration')
export class RegistrationController {

  constructor(private readonly registrationUseCase: RegistrationUseCase) {
    console.log('RegistrationController');
  }


}
