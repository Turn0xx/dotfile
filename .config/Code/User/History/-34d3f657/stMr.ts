import { Controller, Post, UseGuards , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('auth')
export class AuthController {


  @Post('register')
  async register() {
    const useCase = new RegistrationUseCase();
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
