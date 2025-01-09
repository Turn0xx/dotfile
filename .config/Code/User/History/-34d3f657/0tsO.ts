import { Controller, Post, UseGuards , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('auth')
export class AuthController {

  constructor(private readonly registrationUseCase: RegistrationUseCase) {}

  @Post('register')
  async register() {
        
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
