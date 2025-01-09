import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { RegistrationCommand, RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('auth')
export class AuthController {

  constructor() {}

  @Post('register')
  async register(@Body() body: RegistrationCommand){
    this.registrationUseCase.handle(body);
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}