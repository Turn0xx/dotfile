import { Controller } from '@nestjs/common';

@Controller('registration')
export class RegistrationController {

  constructor(private readonly registrationUseCase: RegistrationUseCase) {}


}
