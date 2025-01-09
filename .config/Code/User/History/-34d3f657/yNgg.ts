import { Controller, Post, UseGuards , Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './application/guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor() {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
