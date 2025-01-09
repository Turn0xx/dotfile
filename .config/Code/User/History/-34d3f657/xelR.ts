import { Controller, Post, UseGuards , Request, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    console.log(req);
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('')

}
