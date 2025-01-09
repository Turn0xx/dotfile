import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly registrationUseCase: Regis
    
  ) {}



  @Post('register')
  async register(@Body() user: any) {
    
  }

  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
