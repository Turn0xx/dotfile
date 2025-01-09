import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegistrationUseCase } from './application/usecases/register.usecase';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly registrationUseCase: RegistrationUseCase
    
  ) {}



  @Post('register')
  async register(@Body() user: any) {
    this.registrationUseCase.handle(user);
  }

  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
