import { Controller } from '@nestjs/common';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('registration')
export class RegistrationController {

  constructor(@Inject('RegistrationUseCase') private readonly registrationUseCase: RegistrationUseCase) {
    console.log('RegistrationController');
  }


}
