import { Controller, Post, UseGuards , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {


  @Post('register')
  async register() {
    const useCase = new RegisterUserUseCase();
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
