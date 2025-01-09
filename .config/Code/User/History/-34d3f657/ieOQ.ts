import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    
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
