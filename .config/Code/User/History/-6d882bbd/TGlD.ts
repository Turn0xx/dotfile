import { Controller, Post, UseGuards , Request, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {

  constructor() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')  
  async googleAuth(@Request() req) {
    console.log(req);
  }

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {

    console.log("lol");

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

}
