import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { RegistrationCommand, RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('auth')
export class AuthController {

  constructor() {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
